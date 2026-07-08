import type { Metadata } from "next";
import { CONTACT } from "@/lib/data/contact";

export const metadata: Metadata = {
  title: "Aviso legal y privacidad — Dr. Javier Paino",
  description: "Aviso legal, política de privacidad y condiciones de uso del sitio del Dr. Javier Paino.",
};

export default function AvisoLegal() {
  return (
    <div className="legal-page">
      <h1>Aviso legal y privacidad</h1>

      <h2>Asistente virtual</h2>
      <p>
        El asistente de este sitio es un sistema automatizado basado en
        inteligencia artificial. Ofrece información general y educativa sobre
        neurocirugía, columna, cerebro y manejo del dolor, y bajo ninguna
        circunstancia reemplaza una consulta médica presencial, un diagnóstico
        ni una indicación de tratamiento. Ante cualquier duda sobre su salud,
        agende una cita con el {CONTACT.doctorFullName}.
      </p>

      <h2>Uso del sitio</h2>
      <p>
        El contenido de este sitio tiene fines informativos. {CONTACT.clinicName}{" "}
        y el equipo del Dr. Paino no se responsabilizan por decisiones tomadas
        únicamente en base a la información aquí publicada, sin una evaluación
        médica correspondiente.
      </p>

      <h2>Datos personales</h2>
      <p>
        Los datos que usted comparta a través de este sitio (por ejemplo, al
        escribir al asistente virtual o por WhatsApp) se usan únicamente para
        atender su consulta y coordinar su cita. No se comparten con terceros
        con fines comerciales.
      </p>

      <h2>Testimonios</h2>
      <p>
        Los testimonios publicados en este sitio corresponden a experiencias
        de pacientes que autorizaron su publicación. Los resultados de un
        tratamiento o cirugía varían según cada caso particular.
      </p>

      <p className="legal-page__disclaimer">
        Este texto es una plantilla base y debe ser revisado por un asesor
        legal antes de su publicación definitiva.
      </p>
    </div>
  );
}
