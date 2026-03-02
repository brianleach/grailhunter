import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GRAILHUNTER // COLLECTOR BOT v4.2",
  description: "Real-time collectibles monitoring dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-mono antialiased scanlines grid-bg min-h-screen">
        {children}
      </body>
    </html>
  );
}
