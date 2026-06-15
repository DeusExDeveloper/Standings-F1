import { getStore } from "@netlify/blobs";

// Starting state used before anyone has saved anything.
const DEFAULT_BOARD = {
  title: "Championship Standings",
  bestOf: 6,
  rounds: [],
  drivers: []
};

export default async (req) => {
  const store = getStore("wss-standings");
  const url = new URL(req.url);
  const json = (data, status = 200) =>
    new Response(JSON.stringify(data), {
      status,
      headers: { "content-type": "application/json", "cache-control": "no-store" }
    });

  const password = req.headers.get("x-edit-password");
  const correct = password && process.env.EDIT_PASSWORD && password === process.env.EDIT_PASSWORD;

  // Verify the editor password without touching the data.
  if (req.method === "GET" && url.searchParams.get("check") === "1") {
    return correct ? json({ ok: true }) : json({ ok: false }, 401);
  }

  // Public read.
  if (req.method === "GET") {
    const board = (await store.get("board", { type: "json" })) || DEFAULT_BOARD;
    return json(board);
  }

  // Save — editors only.
  if (req.method === "POST") {
    if (!correct) return json({ error: "Wrong or missing password" }, 401);
    let body;
    try { body = await req.json(); }
    catch { return json({ error: "Could not read the data" }, 400); }
    if (!body || !Array.isArray(body.rounds) || !Array.isArray(body.drivers)) {
      return json({ error: "That doesn't look like a standings board" }, 400);
    }
    await store.setJSON("board", body);
    return json({ ok: true });
  }

  return json({ error: "Method not allowed" }, 405);
};
