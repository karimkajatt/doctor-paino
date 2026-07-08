import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import MobileActionBar from "@/components/layout/MobileActionBar";
import SmoothScroll from "@/components/layout/SmoothScroll";
import ChatWidget from "@/components/chat/ChatWidget";
import { buildPhysicianSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

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
  metadataBase: new URL(SITE_URL),
  title: "Dr. Javier Paino — Neurocirujano en Lima | Columna, Cerebro y Dolor",
  description:
    "Dr. Javier Paino Scarpati, neurocirujano en Lima, titular en Clínica San Felipe. Cirugía mínimamente invasiva de columna, tumores cerebrales, manejo del dolor y neurorrehabilitación. Agende su cita.",
  keywords: [
    "neurocirujano en Lima",
    "cirugía de columna",
    "Clínica San Felipe",
    "hernia de disco Lima",
    "Gamma Knife Perú",
    "manejo del dolor Lima",
  ],
  openGraph: {
    type: "website",
    locale: "es_PE",
    siteName: "Dr. Javier Paino — Neurocirugía",
    title: "Dr. Javier Paino — Neurocirujano en Lima",
    description:
      "Cirugía mínimamente invasiva de columna, tumores cerebrales y manejo del dolor en Clínica San Felipe, Lima.",
    url: SITE_URL,
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Javier Paino — Neurocirujano en Lima",
    description:
      "Cirugía mínimamente invasiva de columna, tumores cerebrales y manejo del dolor en Clínica San Felipe, Lima.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const physicianSchema = buildPhysicianSchema(SITE_URL);
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="es" className={`${inter.variable} ${lora.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(physicianSchema) }}
        />
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
        <WhatsAppButton />
        <MobileActionBar />
        <ChatWidget />
        <Analytics />
        {/* Google Analytics 4 — se activa solo si se define NEXT_PUBLIC_GA_ID */}
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
