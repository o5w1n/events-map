import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ACSC Events | Your Semester Adventure",
  description: "Explore and join ACSC events on your gamified journey",
  icons: {
    icon: "/acsc-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-[var(--background)]`}
      >
        {children}
      </body>
    </html>
  );
}
