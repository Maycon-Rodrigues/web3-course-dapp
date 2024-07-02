import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { ThirdwebProvider } from "thirdweb/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web3 Courses",
  description:
    "This is a Dapp Web3 Courses",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThirdwebProvider>
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </ThirdwebProvider>
    </html>
  );
}
