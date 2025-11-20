// Minimal Node example (20–30 lines)
// Usage: TEST_TOKEN=sk_test_xxx BASE_URL=https://api.example.com/v1 node index.js
const BASE_URL = process.env.BASE_URL || "https://api.example.com/v1";
const AUTH = process.env.TEST_TOKEN;
if (!AUTH) { console.error("Missing TEST_TOKEN"); process.exit(1); }

async function fetchJson(path, opts = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Authorization: `Bearer ${AUTH}`, "Content-Type": "application/json" },
    ...opts,
  });
  return { status: res.status, body: await res.json().catch(() => null) };
}

(async () => {
  console.log("Listing resources...");
  console.log(await fetchJson("/resources"));
  console.log("Creating test resource...");
  console.log(await fetchJson("/resources", { method: "POST", body: JSON.stringify({ name: "example" }) }));
})();
