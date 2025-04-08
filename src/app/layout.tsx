import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { BASIC_INFO } from "@/shared/constants";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: BASIC_INFO.title,
  description: BASIC_INFO.description,
  keywords: BASIC_INFO.keywords,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.className} antialiased`}>{children}</body>
    </html>
  );
}
