import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Laltu Store | Quality Cooking Oils, Rice Bags & Dry Ration Delivery",
  description: "Order authentic packaged Kachi Ghani Mustard Oil, 10kg & 25kg aged rice sacks, Chakki Atta, Dals, and dry fruits. 100% Free doorstep delivery on any distance.",
  keywords: ["grocery delivery", "rice sacks 25kg", "mustard oil jar", "chakki fresh atta", "laltu store", "free home delivery"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-stone-950 text-stone-100 antialiased selection:bg-amber-500 selection:text-stone-950">
        {children}
      </body>
    </html>
  );
}
