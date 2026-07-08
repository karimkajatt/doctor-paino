import { CONTACT } from "./data/contact";
import type { Testimonio } from "./data/testimonials";

// Builders de datos estructurados schema.org (JSON-LD) para SEO.
// Se serializan con JSON.stringify y se inyectan en un <script type="application/ld+json">.

export function buildPhysicianSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: CONTACT.doctorFullName,
    medicalSpecialty: ["Neurosurgery", "Neurología", "Manejo del dolor"],
    url: siteUrl,
    telephone: `+51-1-${CONTACT.phones.direct}`,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: CONTACT.address.line1,
      addressLocality: "Jesús María",
      addressRegion: "Lima",
      addressCountry: "PE",
    },
    sameAs: [CONTACT.facebook.url],
    worksFor: {
      "@type": "MedicalOrganization",
      name: CONTACT.clinicName,
    },
  };
}

export function buildReviewsSchema(testimonios: Testimonio[], siteUrl: string) {
  return testimonios.map((t) => ({
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Physician",
      name: CONTACT.doctorFullName,
      url: siteUrl,
    },
    author: {
      "@type": "Person",
      name: t.nombre,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: t.rating,
      bestRating: 5,
    },
    reviewBody: t.texto,
  }));
}
