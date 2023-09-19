import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Faceboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-gray-50 text-gray-700 ${inter.className}`}
      >
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-screen-sm mx-auto flex justify-between items-center">
            <Link
              href="/"
              className="block text-xl font-bold text-blue-600 tracking-tighter"
            >
              faceboard
            </Link>

            <Link
              href="/upload"
              className="bg-blue-600 font-semibold text-sm rounded-full px-3 py-1 text-white block text-center"
            >
              Upload weird photos for all to see -&gt;
            </Link>
          </div>
        </header>
        <main className="p-4 pb-24">
          <div className="max-w-screen-sm mx-auto">{children}</div>
        </main>
      </body>
    </html>
  );
}
