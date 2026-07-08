import { CONTACT } from "@/lib/data/contact";

export default function NotFound() {
  return (
    <div className="notfound">
      <div className="eyebrow">Error 404</div>
      <h1>Esta página no existe</h1>
      <p>
        Puede que el enlace esté roto o la página se haya movido. Vuelva al
        inicio o comuníquese al consultorio si necesita ayuda para agendar su
        cita.
      </p>
      <div className="hero-ctas">
        <a href="/" className="btn btn-primary">
          Volver al inicio
        </a>
        <a href={`tel:+51${CONTACT.phones.directDial.replace(/^0/, "")}`} className="btn btn-ghost">
          Llamar al consultorio
        </a>
      </div>
    </div>
  );
}
