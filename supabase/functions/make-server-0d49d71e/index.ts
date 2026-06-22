import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.ts";

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

app.use("*", logger(console.log));

app.onError((err, c) => {
  console.error("Server error:", err);
  return c.json({ error: "Internal server error", details: err.message }, 500);
});

app.get("/make-server-0d49d71e/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

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

app.post("/make-server-0d49d71e/websites", async (c) => {
  try {
    const body = await c.req.json();
    const { websites } = body;

    if (!Array.isArray(websites)) {
      return c.json({ error: "Invalid data format - expected array of websites" }, 400);
    }

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
    const updated = [newEntry, ...existing].slice(0, 100);
    await kv.set("error_log", updated);
  } catch (e) {
    console.error("Failed to log error:", e);
  }
}

function getErrorExplanation(type: string, message: string): string {
  const msg = message.toLowerCase();

  if (msg.includes("quota") || msg.includes("storage full") || msg.includes("payload too large")) {
    return "The data payload is too large - most likely because screenshots are stored as full base64 strings. To fix: reduce image resolution before upload, or remove old screenshots from entries.";
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

app.delete("/make-server-0d49d71e/errors", async (c) => {
  try {
    await kv.set("error_log", []);
    return c.json({ success: true, message: "Error log cleared" });
  } catch (error: any) {
    return c.json({ error: "Failed to clear errors", details: error?.message }, 500);
  }
});

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

app.get("/make-server-0d49d71e/api/websites/:id", async (c) => {
  try {
    const id = c.req.param("id");
    const websites: any[] = (await kv.get("websites")) || [];
    const website = websites.find((w: any) => w.id === id);
    if (!website) {
      return c.json({ error: "Website not found" }, 404);
    }
    const { images, ...rest } = website;
    return c.json({ ...rest, screenshot_count: images?.length || 0 });
  } catch (error: any) {
    return c.json({ error: "Failed to fetch website", details: error?.message }, 500);
  }
});

// ─── Costs / Competitor Pricing ───────────────────────────────────────────────

const COSTS_CACHE_KEY = "costs_pricing_cache";
const COSTS_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

const COMPETITORS = [
  { name: "Canva", query: "Canva AI pricing plans 2026" },
  { name: "Adobe Firefly", query: "Adobe Firefly pricing plans 2026" },
  { name: "AdCreative.ai", query: "AdCreative.ai pricing plans 2026" },
  { name: "ChatGPT / GPT-4o", query: "ChatGPT Plus pricing plans 2026" },
  { name: "Midjourney v7", query: "Midjourney pricing plans 2026" },
  { name: "DALL-E 3", query: "DALL-E 3 OpenAI pricing plans 2026" },
  { name: "Stable Diffusion", query: "Stable Diffusion pricing cost 2026" },
  { name: "DaVinci.ai", query: "DaVinci.ai pricing plans 2026" },
  { name: "Runway ML", query: "Runway ML pricing plans 2026" },
  { name: "Kling AI", query: "Kling AI pricing plans 2026" },
  { name: "Claid.ai", query: "Claid.ai pricing plans 2026" },
  { name: "Nightjar", query: "Nightjar AI photography pricing plans 2026" },
  { name: "Flair.ai", query: "Flair.ai pricing plans 2026" },
  { name: "Photoroom", query: "Photoroom pricing plans 2026" },
  { name: "Pebblely", query: "Pebblely pricing plans 2026" },
  { name: "Kive.ai", query: "Kive.ai pricing plans 2026" },
];

async function fetchPricingFromTavily(query: string, apiKey: string): Promise<string> {
  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      query,
      search_depth: "basic",
      max_results: 3,
      include_answer: true,
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Tavily ${res.status}: ${body}`);
  }
  const data = await res.json();
  return data.answer || data.results?.[0]?.content || "Pricing information unavailable.";
}

app.get("/make-server-0d49d71e/costs", async (c) => {
  try {
    const cached: any = await kv.get(COSTS_CACHE_KEY);
    const now = Date.now();

    if (cached && cached.fetchedAt && (now - cached.fetchedAt) < COSTS_TTL_MS) {
      return c.json({ ...cached, fromCache: true });
    }

    // Cache is stale — fetch fresh data
    const apiKey = Deno.env.get("TAVILY_API_KEY");
    if (!apiKey) {
      // Return stale cache if key missing rather than crashing
      if (cached) return c.json({ ...cached, fromCache: true, warning: "TAVILY_API_KEY not set" });
      return c.json({ error: "TAVILY_API_KEY secret not configured in Supabase" }, 503);
    }

    const results: Record<string, string> = {};
    for (const comp of COMPETITORS) {
      try {
        results[comp.name] = await fetchPricingFromTavily(comp.query, apiKey);
      } catch (e: any) {
        console.error(`Tavily error for ${comp.name}:`, e.message);
        results[comp.name] = `Error: ${e.message}`;
      }
    }

    const payload = { pricing: results, fetchedAt: now };
    await kv.set(COSTS_CACHE_KEY, payload);
    return c.json({ ...payload, fromCache: false });
  } catch (error: any) {
    console.error("Error in /costs:", error);
    return c.json({ error: "Failed to fetch costs data", details: error?.message }, 500);
  }
});

app.post("/make-server-0d49d71e/costs/refresh", async (c) => {
  try {
    const apiKey = Deno.env.get("TAVILY_API_KEY");
    if (!apiKey) return c.json({ error: "TAVILY_API_KEY secret not configured in Supabase" }, 503);

    const results: Record<string, string> = {};
    for (const comp of COMPETITORS) {
      try {
        results[comp.name] = await fetchPricingFromTavily(comp.query, apiKey);
      } catch (e: any) {
        console.error(`Tavily error for ${comp.name}:`, e.message);
        results[comp.name] = `Error: ${e.message}`;
      }
    }

    const payload = { pricing: results, fetchedAt: Date.now() };
    await kv.set(COSTS_CACHE_KEY, payload);
    return c.json({ ...payload, fromCache: false });
  } catch (error: any) {
    console.error("Error in /costs/refresh:", error);
    return c.json({ error: "Failed to refresh costs data", details: error?.message }, 500);
  }
});

// ──────────────────────────────────────────────────────────────────────────────

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
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};

Deno.serve(handler);
