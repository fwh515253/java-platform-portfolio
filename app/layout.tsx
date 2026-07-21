import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Java 后端开发工程师 | 云原生平台研发",
  description: "Java 后端、云原生平台与 AI 应用工程化个人作品集。",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
