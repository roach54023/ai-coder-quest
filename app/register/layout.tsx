import type { Metadata } from "next";

import { siteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Create a VibeCamp Account",
  description: "Create a free VibeCamp account to start the vibe coding course.",
  alternates: {
    canonical: `${siteUrl}/register`,
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

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
