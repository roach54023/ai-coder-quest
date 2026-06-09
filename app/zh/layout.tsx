import type { Metadata } from "next";

export const metadata: Metadata = {
  other: {
    "content-language": "zh-CN",
  },
};

export default function ZhLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
