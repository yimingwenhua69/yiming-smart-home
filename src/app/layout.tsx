import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "YIMING STUDIO｜奕明智能家居知识库", template: "%s｜YIMING STUDIO" },
  description: "面向中国市场的智能家居产品、协议生态、灯光技术、空间场景与工程知识库。先确认能不能装，再决定值不值得选。",
  applicationName: "YIMING STUDIO",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "YIMING STUDIO",
    title: "YIMING STUDIO｜奕明智能家居知识库",
    description: "智能家居 · 灯光设计 · 空间光影"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
