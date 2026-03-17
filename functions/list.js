// /functions/list.js

export async function onRequest(context) {
  const root = await context.env.ASSETS.fetch("https://whatever/");
  const result = await scan("/", context.env.ASSETS);
  return new Response(JSON.stringify(result), {
    headers: { "Content-Type": "application/json" }
  });
}

async function scan(path, assets) {
  const listing = await assets.list({ prefix: path.replace(/^\//, "") });
  const tree = {};

  for (const file of listing.objects) {
    const rel = file.key.replace(path, "").split("/");

    // Skip top-level empty entries
    if (!rel[0]) continue;

    // File in current folder
    if (rel.length === 1 && rel[0].endsWith("index.html")) {
      tree["index"] = file.key;
    }

    // Folder
    if (rel.length > 1) {
      const folder = rel[0];
      if (!tree[folder]) tree[folder] = {};
    }
  }

  // Recurse into folders
  for (const key of Object.keys(tree)) {
    if (key !== "index") {
      tree[key] = await scan(`${path}${key}/`, assets);
    }
  }

  return tree;
}
