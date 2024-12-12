import type { Metadata } from "next";
import localFont from "next/font/local";
import Provider from "@/providers/provider";

import "./globals.css";
import 'react-phone-number-input/style.css';
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/ReactToastify.min.css';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "The Grind Academy",
  description: "The Grind Academy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          {children}
        </Provider>
      </body>
    </html>
  );
}
