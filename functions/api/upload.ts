interface Env {
  R2_UPLOADS: R2Bucket;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const ALLOWED_CATEGORIES = ["avatar", "block", "general"];
const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  // NEAR account ID — used for path scoping
  const accountId = context.request.headers.get("x-near-account") || "";
  if (!accountId || accountId.length > 128) {
    return json({ error: "Missing or invalid x-near-account header" }, 400);
  }

  // Sanitize for use as a path segment
  const safeAccountId = accountId.replace(/[^a-zA-Z0-9.\-_]/g, "_");

  // Validate content type
  const contentType =
    context.request.headers.get("content-type") || "application/octet-stream";
  const mimeType = contentType.split(";")[0].trim();
  if (!ALLOWED_TYPES.includes(mimeType)) {
    return json({ error: "Invalid content type. Allowed: jpeg, png, webp, gif" }, 400);
  }

  // Validate category
  const categoryHeader = context.request.headers.get("x-upload-category") || "general";
  const category = ALLOWED_CATEGORIES.includes(categoryHeader) ? categoryHeader : "general";

  // Validate content length
  const contentLength = Number(context.request.headers.get("content-length") || "0");
  if (!contentLength || contentLength > MAX_BYTES) {
    return json({ error: "File too large (max 5 MB)" }, 413);
  }

  const buf = await context.request.arrayBuffer();
  if (buf.byteLength > MAX_BYTES) {
    return json({ error: "File too large (max 5 MB)" }, 413);
  }

  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const ext = mimeType.split("/")[1] || "bin";
  const key = `uploads/${safeAccountId}/${category}/${timestamp}-${random}.${ext}`;

  try {
    await context.env.R2_UPLOADS.put(key, buf, {
      httpMetadata: { contentType: mimeType },
    });

    return json({ key });
  } catch (err) {
    console.error("R2 upload error:", err);
    return json({ error: "Upload failed" }, 500);
  }
};
