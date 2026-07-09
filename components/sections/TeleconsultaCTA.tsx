import Image from "next/image";
import OpenChatButton from "@/components/chat/OpenChatButton";

export default function TeleconsultaCTA() {
  return (
    <section className="section" id="teleconsulta">
      <div className="section__inner teleconsulta-grid">
        <div className="teleconsulta-photo">
          <Image
            src="/images/dr-paino.png"
            alt="Dr. Javier Paino, listo para la consulta virtual"
            fill
            sizes="(max-width: 860px) 100vw, 420px"
          />
          <span className="teleconsulta-photo__status">
            <span className="consult-status-dot" aria-hidden="true" />
            En línea
          </span>
        </div>
        <div className="teleconsulta-copy">
          <div className="eyebrow">Consulta virtual</div>
          <h2>Hable con el Dr. Paino antes de su cita</h2>
          <p>
            Resuelva sus dudas sobre columna, cerebro, dolor o tumores en una
            consulta virtual guiada, como si estuviera en una videollamada con
            el doctor. Información general para orientarlo — no reemplaza una
            evaluación presencial.
          </p>
          <OpenChatButton>Iniciar teleconsulta →</OpenChatButton>
        </div>
      </div>
    </section>
  );
}
