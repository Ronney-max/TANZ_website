import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TANZ · Connected hospitality",
  description: "Explore the TANZ hospitality ecosystem: property management, POS, booking, guest relationships and more.",
  other: {
    "codex-preview": "development",
  },
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
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
