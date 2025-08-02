import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Liro",
  description: "Entregue Seu Software com Confiança",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
