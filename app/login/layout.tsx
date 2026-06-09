import type { Metadata } from "next";

import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Log in to VibeCamp",
  description: "Log in to continue your VibeCamp AI coding course.",
  alternates: {
    canonical: `${siteUrl}/login`,
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
