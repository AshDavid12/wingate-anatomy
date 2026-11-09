import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";

const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wingate exam study · אנטומיה, פיזיולוגיה ותרגילים",
  description:
    "Wingate exam study: anatomy, exercise physiology, and the practical exercise booklet. אנטומיה, פיזיולוגיה ותרגילי חדר כושר.",
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
