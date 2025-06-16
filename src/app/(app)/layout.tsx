import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { TRPCProvider, TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "sonner";

const dm_sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dm_sans.variable} antialiased`}
      >
        <TRPCReactProvider>
          <Toaster/>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
