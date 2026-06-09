export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://vibecamps.org")
  .trim()
  .replace(/\/+$/, "");

