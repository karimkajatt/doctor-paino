import { CONTACT, telLink } from "@/lib/data/contact";

export default function Contact() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    CONTACT.address.mapsQuery
  )}&output=embed`;

  return (
    <section className="section" id="contacto">
      <div className="section__inner">
        <div className="eyebrow">Contacto</div>
        <h2>Agende su cita</h2>
        <div className="contact-grid">
          <div>
            <b>Dirección</b>
            <p>{CONTACT.address.full}</p>
          </div>
          <div>
            <b>Teléfonos</b>
            <p>
              <a href={telLink(CONTACT.phones.mainDial)}>{CONTACT.phones.main}</a>
              {" · "}
              <a href={telLink(CONTACT.phones.directDial)}>{CONTACT.phones.direct}</a>
            </p>
          </div>
          <div>
            <b>Correo</b>
            <p>
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
          </div>
          <div>
            <b>Facebook</b>
            <p>
              <a href={CONTACT.facebook.url} target="_blank" rel="noopener noreferrer">
                {CONTACT.facebook.handle}
              </a>{" "}
              · {CONTACT.facebook.followers} · {CONTACT.facebook.rating}
            </p>
          </div>
        </div>
        <div className="map-frame">
          <iframe
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Ubicación de ${CONTACT.clinicName} en ${CONTACT.address.line2}`}
          />
        </div>
      </div>
    </section>
  );
}
