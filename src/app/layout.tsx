import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Waves } from "@/components/Waves";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Souvlaki42",
  description: "My personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
          <Waves>{children}</Waves>
      </body>
    </html>
  );
}
