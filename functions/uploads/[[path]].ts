interface Env {
  R2_UPLOADS: R2Bucket;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const path = context.params.path;
  if (!path || !Array.isArray(path) || path.length === 0) {
    return new Response("Not found", { status: 404 });
  }

  const key = `uploads/${path.join("/")}`;

  try {
    const object = await context.env.R2_UPLOADS.get(key);

    if (!object) {
      return new Response("Not found", { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    // Immutable cache: files use timestamps so they never change
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    return new Response(object.body, { headers });
  } catch (err) {
    console.error("R2 get error:", err);
    return new Response("Internal Error", { status: 500 });
  }
};
