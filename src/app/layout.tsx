import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Albots | AI Automation",
  description: "AI chatbots, voicebots, and customer service automation."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
