import { TESTIMONIOS } from "@/lib/data/testimonials";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="stars" role="img" aria-label={`Calificación: ${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden="true" style={{ opacity: i < rating ? 1 : 0.25 }}>
          <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.2-5.4 3.2 1.3-6L1.3 7.7l6.1-.6L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="section" id="testimonios">
      <div className="section__inner">
        <div className="eyebrow">Testimonios</div>
        <h2>Lo que cuentan quienes ya vinieron</h2>
        <p className="testimonials-note">
          Ejemplos ilustrativos del diseño de esta sección — a reemplazar por
          reseñas reales de pacientes, con su autorización.
        </p>
        <div className="testimonials-grid">
          {TESTIMONIOS.map((t) => (
            <article className="testimonial-card" key={t.nombre}>
              <Stars rating={t.rating} />
              <p className="quote">&ldquo;{t.texto}&rdquo;</p>
              <div>
                <div className="autor">{t.nombre}</div>
                {t.procedimiento && <div className="procedimiento">{t.procedimiento}</div>}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
