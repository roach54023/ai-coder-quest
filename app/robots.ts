import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vibecamps.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/about", "/projects", "/stories", "/levels", "/zh", "/zh/levels", "/zh/stories"],
      disallow: [
        "/dashboard",
        "/profile",
        "/share",
        "/admin",
        "/zh/dashboard",
        "/zh/profile",
        "/zh/admin",
        "/api",
        "/login",
        "/register",
        "/zh/login",
        "/zh/register",
        "/zh/share",
      ],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
