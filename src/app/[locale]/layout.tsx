import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { QueryProvider } from "@/components/providers/query-provider";
import { ThemeProvider } from "@/lib/theme-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://liro.com.br"),
  title: "Liro - Entregue Seu Software com Confiança",
  description:
    "Plataforma de entrega de software que garante qualidade, segurança e confiabilidade para seus projetos. Desenvolva e implante com tranquilidade.",
  keywords: [
    "software",
    "desenvolvimento",
    "qualidade",
    "segurança",
    "confiabilidade",
    "entrega",
    "deploy",
  ],
  authors: [{ name: "Liro" }],
  creator: "Liro",
  publisher: "Liro",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://liro.com.br",
    siteName: "Liro",
    title: "Liro - Entregue Seu Software com Confiança",
    description:
      "Plataforma de entrega de software que garante qualidade, segurança e confiabilidade para seus projetos.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Liro - Entregue Seu Software com Confiança",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Liro - Entregue Seu Software com Confiança",
    description:
      "Plataforma de entrega de software que garante qualidade, segurança e confiabilidade.",
    images: ["/logo.png"],
  },
};

const locales = ["en", "br"];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="canonical" href={`https://liro.com.br/${locale}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Liro",
              url: "https://liro.com.br",
              logo: "https://liro.com.br/logo.png",
              description:
                "Plataforma de entrega de software que garante qualidade, segurança e confiabilidade para seus projetos.",
              sameAs: [
                "https://twitter.com/liro",
                "https://linkedin.com/company/liro",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased mx-auto`}>
        <ThemeProvider>
          <QueryProvider>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
