import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import image from "../../public/acsc-logo.svg"

const poppins = Poppins({ 
  weight: ["400", "600", "700", "800"],
  subsets: ["latin"] 
});

export const metadata: Metadata = {
  title: "ACSC Events",
  description: "Gamified event tracking for our school",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="../public/acsc-logo.svg" />
      </head>
      <body className={`${poppins.className} antialiased`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}