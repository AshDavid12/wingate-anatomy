import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anatomy and physiology · אנטומיה ופיזיולוגיה למבחן",
  description:
    "Wingate exam study: muscle Origin, Insertion, and Action, plus exercise physiology — energy pathways, VO2max, and recovery. אנטומיה ופיזיולוגיה של תפקוד האדם.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className={heebo.variable}>
      <body className={`${heebo.className} antialiased paper-grid min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
