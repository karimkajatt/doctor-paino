import { MODALIDADES, PRICING_NOTE } from "@/lib/data/pricing";

export default function Pricing() {
  return (
    <section className="section" id="modalidades">
      <div className="section__inner">
        <div className="eyebrow">Modalidades de atención</div>
        <h2>Elija el tipo de consulta que necesita</h2>
        <div className="pricing-grid">
          {MODALIDADES.map((m) => (
            <div
              className={`pricing-card${m.destacado ? " pricing-card--highlight" : ""}`}
              key={m.title}
            >
              <h3>{m.title}</h3>
              <div className="precio">{m.precio}</div>
              <p className="desc">{m.desc}</p>
              <a href="#contacto" className="btn btn-primary btn-sm">
                Agendar
              </a>
            </div>
          ))}
        </div>
        <p className="pricing-note">{PRICING_NOTE}</p>
      </div>
    </section>
  );
}
