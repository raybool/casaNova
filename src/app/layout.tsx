import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/global.scss";

const inter = Inter({
  variable: "--font-text",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "CasaNova — Агентство элитной недвижимости",
  description:
    "Индивидуальный подбор элитной недвижимости по всему миру. Эксклюзивные объекты, персональный подход, полный комплекс услуг.",
  keywords:
    "элитная недвижимость, недвижимость за рубежом, виллы, пентхаусы, CasaNova",
};

export const revalidate = 60;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.variable}>
        <main>{children}</main>
      </body>
    </html>
  );
}
