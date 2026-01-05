export default async function handler(req, res) {
  const { path } = req.query;

  if (!path) {
    return res.status(400).json({ error: "Path is required" });
  }

  // Ensure path starts with /
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const targetUrl = `https://numra.motofy.io${cleanPath}`;

  try {
    const response = await fetch(targetUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Forward the content type
    res.setHeader(
      "Content-Type",
      response.headers.get("content-type") || "image/png"
    );
    // Allow CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    // Cache for a long time
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

    res.send(buffer);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Failed to fetch image" });
  }
}
