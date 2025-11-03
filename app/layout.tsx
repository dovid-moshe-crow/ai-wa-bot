import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI WhatsApp Bot",
  description: "AI-powered customer service bot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
