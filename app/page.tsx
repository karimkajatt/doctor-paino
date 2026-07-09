import Image from "next/image";
import SceneTour, { type TourPanel } from "@/components/tour/SceneTour";
import StatCounter from "@/components/tour/StatCounter";
import OpenChatButton from "@/components/chat/OpenChatButton";
import Institutions from "@/components/sections/Institutions";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import { CONTACT } from "@/lib/data/contact";
import { SERVICIOS } from "@/lib/data/services";

const PANELS: TourPanel[] = [
  {
    id: "inicio",
    content: (
      <>
        <div className="eyebrow">Instituto de Neurocirugía · Dr. Javier Paino</div>
        <h1>Dr. Javier Paino Scarpati — Neurocirugía de Columna y Cerebro</h1>
        <p>
          Neurocirujano titular de {CONTACT.clinicName}, formado en Mount Sinai
          (Nueva York) y con Doctorado (PhD) en Biología Molecular por George
          Washington University. {CONTACT.yearsExperience} de experiencia en
          cirugía mínimamente invasiva de columna, tumores cerebrales y manejo
          del dolor.
        </p>
        <div className="badges-row">
          {CONTACT.credentials.map((c) => (
            <span className="badge" key={c}>
              {c}
            </span>
          ))}
        </div>
        <div className="hero-ctas">
          <a href="#contacto" className="btn btn-primary">
            Agendar cita →
          </a>
          <a href="#sobre-el-doctor" className="btn btn-ghost">
            Ingresar al consultorio
          </a>
        </div>
      </>
    ),
  },
  {
    id: "sobre-el-doctor",
    content: (
      <>
        <div className="doctor-portrait">
          <Image
            src="/images/dr-paino.png"
            alt="Dr. Javier Paino Scarpati en su consultorio"
            fill
            sizes="108px"
          />
        </div>
        <div className="eyebrow">Sobre el Dr. Paino</div>
        <h2>Formación de nivel internacional, atención cercana</h2>
        <p>
          El {CONTACT.doctorFullName} es Neurocirujano Titular en{" "}
          {CONTACT.clinicName} (Jesús María y La Molina) y Director de
          NeuroGen, equipo especializado en neuro-regeneración. Se formó en la
          Universidad Federal de Paraná (Brasil), realizó su residencia en
          Neurocirugía en Mount Sinai School of Medicine (Nueva York) y obtuvo
          su Doctorado (PhD) en Biología Molecular y Bioquímica en George
          Washington University. Es Profesor Adjunto de Investigación en
          George Washington University y en la Universidad de Ingeniería y
          Tecnología (UTEC), donde lidera un laboratorio de bioingeniería
          reconocido por CONCYTEC.
        </p>
        <div className="stat-row">
          <StatCounter value={30} suffix="+" label="años de experiencia" />
          <StatCounter value={100} suffix="+" label="cirugías al año" />
        </div>
        <ul className="fact-list">
          <li>{CONTACT.credentials.join(" · ")}</li>
          <li>Idiomas: {CONTACT.languages.join(", ")}</li>
        </ul>
      </>
    ),
  },
  {
    id: "especialidades",
    wide: true,
    content: (
      <>
        <div className="eyebrow">Especialidades</div>
        <h2>Atención integral en neurocirugía</h2>
        <div className="servicios-grid">
          {SERVICIOS.map((s) => (
            <div className="servicio-card" key={s.title}>
              <b>{s.title}</b>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: "consultorio",
    content: (
      <>
        <div className="eyebrow">Consultorio del Dr. Paino</div>
        <h2>Ha llegado. Conversemos.</h2>
        <p>
          Pregúnteme sus dudas más comunes y le responderé con mi criterio.
          Este asistente da información general y no reemplaza una consulta
          médica.
        </p>
        <div className="doctor-card">
          <div className="ava" aria-hidden="true">
            JP
          </div>
          <div>
            <b>Dr. Javier Paino</b>
            <p>Asistente virtual · disponible ahora</p>
          </div>
        </div>
        <OpenChatButton>Iniciar la consulta virtual →</OpenChatButton>
      </>
    ),
  },
];

export default function Home() {
  return (
    <>
      <SceneTour panels={PANELS} />
      <Institutions />
      <Testimonials />
      <Pricing />
      <Faq />
      <Contact />
    </>
  );
}
