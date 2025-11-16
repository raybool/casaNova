import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "../styles/global.scss";

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-text",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CasaNova — Агентство элитной недвижимости",
  description: "Индивидуальный подбор элитной недвижимости по всему миру. Эксклюзивные объекты, персональный подход, полный комплекс услуг.",
  keywords: "элитная недвижимость, недвижимость за рубежом, виллы, пентхаусы, CasaNova",
};

export const revalidate = 60;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${playfairDisplay.variable} ${inter.variable}`}>
        <main>{children}</main>
      </body>
    </html>
  );
}
