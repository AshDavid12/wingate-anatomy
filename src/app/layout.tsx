import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Anatomy for the exam · אנטומיה למבחן · Origin · Insertion · Action",
  description:
    "Muscle and bone tables with Origin, Insertion, and Action — a Wingate anatomy exam study tool. טבלאות שרירים ועצמות עם Origin, Insertion ותנועה.",
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
