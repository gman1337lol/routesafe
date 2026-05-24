import { Poppins } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"]
});
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RouteSafe",
  description: "Safe scheduled rides for you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className={`${poppins.className} min-h-full flex flex-col`}>{children}</body>
    </html>
  );
}
