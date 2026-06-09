import { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site-url";

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
