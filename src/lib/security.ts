export function sanitizeUrl(url: string): string {
  if (!url) return "";

  if (url.startsWith("/")) {
    if (url.startsWith("//")) {
      return "";
    }
    return url;
  }

  try {
    const parsed = new URL(url);
    const allowedProtocols = ["http:", "https:", "mailto:", "tel:"];
    if (allowedProtocols.includes(parsed.protocol)) {
      if (parsed.protocol === "http:") {
        const secureDomains = [
          "instagram.com",
          "twitter.com",
          "x.com",
          "facebook.com",
          "linkedin.com",
          "github.com",
          "youtube.com",
          "tiktok.com"
        ];
        const hostname = parsed.hostname.toLowerCase();
        if (secureDomains.some(domain => hostname === domain || hostname.endsWith(`.${domain}`))) {
          parsed.protocol = "https:";
          return parsed.toString();
        }
      }
      return parsed.toString();
    }
  } catch {
    return "";
  }

  return "";
}
