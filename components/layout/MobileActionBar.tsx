import { CONTACT, telLink, waLink } from "@/lib/data/contact";

export default function MobileActionBar() {
  return (
    <nav className="mobile-action-bar" aria-label="Acciones rápidas">
      <a href={telLink(CONTACT.phones.directDial)} aria-label="Llamar al consultorio">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z" />
        </svg>
        Llamar
      </a>
      <a
        href={waLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escribir por WhatsApp"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.29-1.39a9.9 9.9 0 0 0 4.75 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Z" />
        </svg>
        WhatsApp
      </a>
      <a href="#contacto" aria-label="Ir a agendar cita">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7Zm-2 6h14v12H5V8Z" />
        </svg>
        Agendar
      </a>
    </nav>
  );
}
