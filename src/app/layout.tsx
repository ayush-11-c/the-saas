import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ModelProvider } from "@/components/ui/model-provider";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SAAS",
  description: "AI PLATFORM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ModelProvider />
          {children}
        </body>
      </html>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </ClerkProvider>
  );
}
