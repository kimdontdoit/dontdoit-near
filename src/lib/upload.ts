export type UploadCategory = "avatar" | "block" | "general";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_BYTES = 5 * 1024 * 1024;

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Only JPEG, PNG, WebP, and GIF images are allowed";
  }
  if (file.size > MAX_BYTES) {
    return "File size must be less than 5 MB";
  }
  return null;
}

/**
 * Upload an image to R2 via the Cloudflare Pages Function.
 * Returns the public URL of the uploaded image (served by functions/uploads/[[path]].ts).
 */
export async function uploadImage(
  file: File,
  accountId: string,
  category: UploadCategory = "general"
): Promise<string> {
  const validationError = validateImageFile(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const response = await fetch("/api/upload", {
    method: "POST",
    headers: {
      "Content-Type": file.type,
      "Content-Length": String(file.size),
      "X-Near-Account": accountId,
      "X-Upload-Category": category,
    },
    body: file,
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error((body as any).error || `Upload failed (${response.status})`);
  }

  const { key } = (await response.json()) as { key: string };
  return `/${key}`;
}
