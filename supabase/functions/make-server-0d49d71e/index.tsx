import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

app.use('*', logger(console.log));

app.onError((err, c) => {
  console.error("Server error:", err);
  return c.json({ error: "Internal server error", details: err.message }, 500);
});

// Health check
app.get("/make-server-0d49d71e/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Get all websites
app.get("/make-server-0d49d71e/websites", async (c) => {
  try {
    const websites = await kv.get("websites");
    return c.json({ websites: websites || [] });
  } catch (error: any) {
    console.error("Error fetching websites:", error);
    await logError({
      type: "FETCH_WEBSITES_FAILED",
      message: error?.message || String(error),
      context: "GET /websites",
      explanation: "Failed to read the websites list from the key-value store. This may be a temporary database connection issue.",
    });
    return c.json({ error: "Failed to fetch websites", details: error?.message || String(error) }, 500);
  }
});

// Save all websites
app.post("/make-server-0d49d71e/websites", async (c) => {
  try {
    const body = await c.req.json();
    const { websites } = body;

    if (!Array.isArray(websites)) {
      return c.json({ error: "Invalid data format — expected array of websites" }, 400);
    }

    // Check payload size and warn if large
    const payloadSize = JSON.stringify(websites).length;
    if (payloadSize > 5_000_000) {
      await logError({
        type: "LARGE_PAYLOAD_WARNING",
        message: `Payload size is ${(payloadSize / 1024 / 1024).toFixed(2)} MB`,
        context: "POST /websites",
        explanation: "The data being saved is very large, likely due to high-resolution screenshots stored as base64. Consider compressing images before upload to prevent save failures.",
      });
    }

    await kv.set("websites", websites);
    return c.json({ success: true, message: "Websites saved successfully", timestamp: new Date().toISOString() });
  } catch (error: any) {
    const errorMsg = error?.message || String(error);
    console.error("Error saving websites:", errorMsg);
    await logError({
      type: "SAVE_WEBSITES_FAILED",
      message: errorMsg,
      context: "POST /websites",
      explanation: getErrorExplanation("SAVE_WEBSITES_FAILED", errorMsg),
    });
    return c.json({ error: "Failed to save websites", details: errorMsg }, 500);
  }
});

// --- Error Tracking ---

interface ErrorEntry {
  id: string;
  timestamp: string;
  type: string;
  message: string;
  context: string;
  explanation: string;
}

async function logError(entry: Omit<ErrorEntry, "id" | "timestamp">) {
  try {
    const existing: ErrorEntry[] = (await kv.get("error_log")) || [];
    const newEntry: ErrorEntry = {
      id: `err-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      timestamp: new Date().toISOString(),
      ...entry,
    };
    // Keep last 100 errors
    const updated = [newEntry, ...existing].slice(0, 100);
    await kv.set("error_log", updated);
  } catch (e) {
    console.error("Failed to log error:", e);
  }
}

function getErrorExplanation(type: string, message: string): string {
  const msg = message.toLowerCase();

  if (msg.includes("quota") || msg.includes("storage full") || msg.includes("payload too large")) {
    return "The data payload is too large — most likely because screenshots are stored as full base64 strings. To fix: reduce image resolution before upload, or remove old screenshots from entries.";
  }
  if (msg.includes("timeout") || msg.includes("aborted") || msg.includes("abort")) {
    return "The request timed out before the server responded. This usually happens when saving very large amounts of data. Try reducing image sizes or splitting data into smaller saves.";
  }
  if (msg.includes("network") || msg.includes("fetch") || msg.includes("connection")) {
    return "A network error occurred connecting to the backend. Check your internet connection. If the issue persists, the Supabase edge function may be temporarily down.";
  }
  if (msg.includes("unauthorized") || msg.includes("403") || msg.includes("401")) {
    return "Authentication failed. The API key may be invalid or expired. Try refreshing the page.";
  }
  if (msg.includes("not found") || msg.includes("404")) {
    return "The requested route was not found on the server. This may indicate the server code needs redeployment.";
  }
  if (type === "SAVE_WEBSITES_FAILED") {
    return "Saving websites to cloud storage failed. Your data was NOT saved to the cloud this time. Check for large screenshots or network issues.";
  }
  if (type === "FETCH_WEBSITES_FAILED") {
    return "Loading websites from cloud storage failed. The app may fall back to locally cached data. This is usually a temporary connectivity issue.";
  }
  return "An unexpected error occurred. Check the error message for details and try the operation again.";
}

// POST /errors — log an error from the frontend
app.post("/make-server-0d49d71e/errors", async (c) => {
  try {
    const body = await c.req.json();
    const { type, message, context } = body;

    if (!type || !message) {
      return c.json({ error: "Missing required fields: type, message" }, 400);
    }

    const explanation = body.explanation || getErrorExplanation(type, message);
    await logError({ type, message, context: context || "frontend", explanation });

    return c.json({ success: true });
  } catch (error: any) {
    console.error("Error logging error:", error);
    return c.json({ error: "Failed to log error", details: error?.message }, 500);
  }
});

// GET /errors — retrieve recent errors
app.get("/make-server-0d49d71e/errors", async (c) => {
  try {
    const errors: ErrorEntry[] = (await kv.get("error_log")) || [];
    const limit = parseInt(c.req.query("limit") || "50");
    return c.json({ errors: errors.slice(0, limit), total: errors.length });
  } catch (error: any) {
    console.error("Error fetching error log:", error);
    return c.json({ error: "Failed to fetch errors", details: error?.message }, 500);
  }
});

// DELETE /errors — clear error log
app.delete("/make-server-0d49d71e/errors", async (c) => {
  try {
    await kv.set("error_log", []);
    return c.json({ success: true, message: "Error log cleared" });
  } catch (error: any) {
    return c.json({ error: "Failed to clear errors", details: error?.message }, 500);
  }
});

// --- Data API (for external access / Claude) ---

// GET /api/summary — high-level stats
app.get("/make-server-0d49d71e/api/summary", async (c) => {
  try {
    const websites: any[] = (await kv.get("websites")) || [];
    const summary = {
      total_websites: websites.length,
      total_clicks: websites.reduce((s: number, w: any) => s + (w.clicks || 0), 0),
      total_screenshots: websites.reduce((s: number, w: any) => s + (w.images?.length || 0), 0),
      websites: websites.map((w: any) => ({
        id: w.id,
        name: w.name,
        url: w.url,
        clicks: w.clicks,
        screenshot_count: w.images?.length || 0,
        has_notes: !!(w.notes?.trim()),
      })),
      generated_at: new Date().toISOString(),
    };
    return c.json(summary);
  } catch (error: any) {
    return c.json({ error: "Failed to generate summary", details: error?.message }, 500);
  }
});

// GET /api/websites/:id — get one website detail
app.get("/make-server-0d49d71e/api/websites/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const websites: any[] = (await kv.get("websites")) || [];
    const website = websites.find((w: any) => w.id === id);
    if (!website) {
      return c.json({ error: "Website not found" }, 404);
    }
    // Strip large image data for lightweight response
    const { images, ...rest } = website;
    return c.json({ ...rest, screenshot_count: images?.length || 0 });
  } catch (error: any) {
    return c.json({ error: "Failed to fetch website", details: error?.message }, 500);
  }
});

// Catch-all
app.all("*", (c) => {
  console.log("Unmatched route:", c.req.method, c.req.url);
  return c.json({ error: "Route not found", method: c.req.method, path: c.req.url }, 404);
});

const handler = async (req: Request) => {
  try {
    return await app.fetch(req);
  } catch (error) {
    console.error("Uncaught error in handler:", error);
    return new Response(
      JSON.stringify({ error: "Server error", details: String(error) }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

Deno.serve(handler);
