import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Javier Paino — Neurocirugía de Columna y Cerebro",
  description:
    "Dr. Javier Paino Scarpati, neurocirujano titular en Clínica San Felipe, Lima. Cirugía mínimamente invasiva de columna, tumores cerebrales, manejo del dolor y neurorrehabilitación.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${lora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
