import type { IncomingMessage, ServerResponse } from "node:http";

export default function handler(request: IncomingMessage, response: ServerResponse) {
  response.setHeader("Cache-Control", "private, no-store, max-age=0");
  response.setHeader("Vary", "X-Vercel-IP-Country");
  response.setHeader("Content-Type", "application/json; charset=utf-8");

  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.statusCode = 405;
    response.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  const header = request.headers["x-vercel-ip-country"];
  const country = (Array.isArray(header) ? header[0] : header)?.trim().toUpperCase() || null;
  response.statusCode = 200;
  response.end(JSON.stringify({ country }));
}
