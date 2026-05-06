import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "MegaMart - Siêu thị trực tuyến đa dạng sản phẩm",
  description: "Mua sắm thông minh với hàng ngàn sản phẩm: Điện thoại, Laptop, Mỹ phẩm, Giày dép, Quần áo, Phụ kiện. Giá tốt, giao hàng nhanh, bảo hành chính hãng.",
  keywords: "mua sắm online, điện thoại, laptop, mỹ phẩm, giày dép, quần áo, phụ kiện, siêu thị trực tuyến",
  authors: [{ name: "MegaMart" }],
  openGraph: {
    title: "MegaMart - Siêu thị trực tuyến đa dạng sản phẩm",
    description: "Mua sắm thông minh với hàng ngàn sản phẩm chính hãng, giá tốt nhất",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${plusJakarta.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${plusJakarta.className} min-h-full flex flex-col`}>
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
