import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://usedita.com.br"),
  title: "Ditá — Performance em cada movimento",
  description: "Moda esportiva brasileira para Triathlon, Hybrid e todos os dias em movimento.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Ditá — Performance em cada movimento",
    description: "Triathlon, Hybrid e performance para todos os dias em movimento.",
    images: [{ url: "/og.png", width: 1733, height: 917, alt: "Nova era Ditá" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ditá — Performance em cada movimento",
    description: "Triathlon, Hybrid e performance para todos os dias em movimento.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
