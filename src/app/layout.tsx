import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "אנטומיה למבחן · Origin · Insertion · Action",
  description:
    "טבלאות שרירים ועצמות עם Origin, Insertion ותנועה — כלי לימוד למבחן אנטומיה במכון וינגייט",
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
