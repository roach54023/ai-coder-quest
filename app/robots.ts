import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vibecodecamp.cn";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/levels", "/stories"],
      disallow: ["/dashboard", "/profile", "/admin", "/api", "/login", "/register", "/share"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
