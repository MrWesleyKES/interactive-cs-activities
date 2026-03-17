// Cloudflare Pages Function: /functions/list.js
// Dynamically fetches your GitHub repo tree and builds navigation JSON.

export async function onRequest() {
  const REPO = "interactive-computing-activities";
  const USER = "MrWesleyKES";

  const apiURL =
    `https://api.github.com/repos/${USER}/${REPO}/git/trees/main?recursive=1`;

  const response = await fetch(apiURL, {
    headers: {
      "User-Agent": "CloudflareWorker",
      "Accept": "application/vnd.github+json"
    }
  });

  if (!response.ok) {
    return new Response(
      JSON.stringify({ error: "GitHub API error", status: response.status }),
      { status: 500 }
    );
  }

  const data = await response.json();

  const tree = data.tree.map(o => o.path);

  // Build nested structure
  const structured = {};

  for (const path of tree) {
    if (!path.endsWith("index.html")) continue;

    const parts = path.split("/");
    parts.pop(); // remove index.html

    let level = structured;

    for (const part of parts) {
      if (!level[part]) {
        level[part] = {};
      }
      level = level[part];
    }

    level.index = path;
  }

  return new Response(JSON.stringify(structured), {
    headers: { "Content-Type": "application/json" }
  });
}
