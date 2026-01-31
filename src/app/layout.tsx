import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vital Glow UK | Premium IV Drips & Aesthetics",
  description: "Feel better. Look better. Perform better. Medically-led IV drips and aesthetics services in the UK. Mobile and clinic-based treatments.",
  keywords: "IV drips, aesthetics, wellness, health, beauty, UK, mobile IV therapy, vitamin infusions",
  icons: {
    icon: "/logo.jpeg",
    apple: "/logo.jpeg",
  },
  openGraph: {
    title: "Vital Glow UK | Premium IV Drips & Aesthetics",
    description: "Feel better. Look better. Perform better. Medically-led IV drips and aesthetics services in the UK.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
