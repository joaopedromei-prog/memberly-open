import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "./components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Desafio de 28 Dias de Calistenia Militar",
  description:
    "Transforme seu corpo em 28 dias com treinos militares de calistenia — sem academia, sem equipamentos, sem desculpas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark-bg text-white`}
      >
        <header className="fixed top-0 left-0 right-0 h-16 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-dark-border px-4 md:px-8 lg:px-16 flex items-center">
          <span className="text-xl font-bold text-white">Calistenia Militar</span>
        </header>
        <main className="pt-16">{children}</main>
        <WhatsAppButton />
        <footer className="bg-dark-bg-deep px-4 py-8 md:px-8 lg:px-16">
          <p className="text-xs text-neutral-500">
            &copy; 2026 Calistenia Militar. Todos os direitos reservados.
          </p>
        </footer>
      </body>
    </html>
  );
}
