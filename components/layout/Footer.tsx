import { CONTACT, telLink } from "@/lib/data/contact";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div>
          <strong style={{ color: "#fff" }}>{CONTACT.doctorFullName}</strong>
          <p>{CONTACT.clinicName} · Jesús María, Lima</p>
        </div>
        <div>
          <a href={telLink(CONTACT.phones.directDial)}>{CONTACT.phones.direct}</a>
          <br />
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </div>
        <div>
          <a href={CONTACT.facebook.url} target="_blank" rel="noopener noreferrer">
            {CONTACT.facebook.handle}
          </a>
        </div>
      </div>
      <div className="site-footer__legal">
        <span>© {new Date().getFullYear()} {CONTACT.doctorFullName}</span>
        <a href="/aviso-legal">Aviso legal y privacidad</a>
      </div>
    </footer>
  );
}
