import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "V-League Portal",
  description: "Vietnam V-League fixtures, standings, and news.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={inter.className}>
      <body>
        <header className="site-header">
          <div className="shell">
            <div className="brand">V-League Portal</div>
            <nav className="nav">
              <Link href="/">Tin tức</Link>
              <Link href="/clubs">CLB</Link>
              <Link href="/dashboard">Bảng xếp hạng</Link>
              <Link href="/ai">AI</Link>
            </nav>
          </div>
        </header>
        <div className="shell">{children}</div>
        <footer className="site-footer">
          <div className="shell">
            <span>Made for MSIS207 Lab 6 · ISR + SSR + API</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
