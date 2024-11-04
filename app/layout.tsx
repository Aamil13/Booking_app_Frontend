import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Providers } from "@/redux/Provider";
import NextTopLoader from "nextjs-toploader";
import dynamic from "next/dynamic";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/shared/Navbar";

// const NoSSR = dynamic(() => import('@/app/components/shared/Navbar'), { ssr: false })
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Booking app",
  description:
    "Booking app created using nextjs for front-end and node/express backend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {/* <NoSSR/> */}
          <Navbar />
          <div>
            <Toaster />
          </div>
          <NextTopLoader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
