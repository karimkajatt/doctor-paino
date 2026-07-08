"use client";

import { useEffect, useRef, useState } from "react";

const SCENES = [
  { key: "fachada", label: "Bienvenida" },
  { key: "recepcion", label: "Sobre el Dr. Paino" },
  { key: "pasillo", label: "Especialidades" },
  { key: "consultorio", label: "Consultorio" },
];

const FAQS = [
  {
    q: "¿Cubrirá mi seguro las consultas médicas y la cirugía?",
    a: "Trabajamos con la mayoría de las compañías de seguros mediante el sistema de reembolso. Cualquier duda, comuníquese al 261-6139 / 261-5615.",
  },
  {
    q: "¿Qué debo hacer para agendar mi cita?",
    a: "Tenga a la mano el nombre del paciente y sus datos de contacto (teléfono y correo). Si tiene orden de laboratorio o resonancia, verifique que los resultados no tengan más de 6 meses de antigüedad. Para citas urgentes, puede anotarse en lista de espera con la secretaria. Si no puede asistir, avise con anticipación para reprogramar.",
  },
  {
    q: "¿Dónde puedo hacerme exámenes de RX y Resonancia Magnética?",
    a: "En DPI, Av. Dos de Mayo 602, San Isidro. Tel. 202-3333. Trabajan con todas las compañías de seguros y EPS.",
  },
  {
    q: "¿Hay instrucciones previas a una cirugía?",
    a: "Sí. Suspender antiinflamatorios o aspirina 10 días antes. El día de la operación, desayuno liviano a las 6:00 am (jugo, manzanilla, 2 tostadas) y luego nada de líquidos. Traer corsé rígido bivalvo a medida (Ortopedia Wong, tel. 4404190 / 98182689, demora ~10 días en confeccionarse).",
  },
];

const SERVICIOS = [
  {
    title: "Cirugía mínimamente invasiva de columna",
    desc: "Instrumentación compleja, preservación del movimiento y navegación por imágenes. Más de 100 cirugías al año con monitoreo neurofisiológico intraoperatorio para reducir riesgos.",
  },
  {
    title: "Manejo del dolor",
    desc: "Tratamiento de neuralgias, hernias, radiculopatías, cefaleas refractarias, túnel del carpo y dolor post-derrame cerebral, con bloqueos y terapias percutáneas.",
  },
  {
    title: "Tumores cerebrales y de columna",
    desc: "Diagnóstico y tratamiento de meningiomas y otros tumores, con acceso a radiocirugía (Gamma Knife) y trabajo conjunto con cirujanos oncólogos para casos complejos.",
  },
  {
    title: "Neurorrehabilitación",
    desc: "Programas personalizados de recuperación post-quirúrgica y para afecciones degenerativas, supervisados directamente por el Dr. Paino.",
  },
  {
    title: "Investigación y medicina regenerativa",
    desc: "Pionero en investigación de células madre en el Perú, con proyectos financiados por CONCYTEC y colaboración con Cleveland Clinic, enfocados en terapias para enfermedades neurodegenerativas.",
  },
];

type ChatMessage = { role: "user" | "assistant"; content: string };

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Hola, soy el asistente virtual del Dr. Paino. ¿En qué puedo ayudarle? Puede preguntarme sobre columna, cerebro, dolor o tumores.",
  },
];

export default function Home() {
  const [activeScene, setActiveScene] = useState(0);
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    SCENES.map(() => false)
  );
  const [chatOpen, setChatOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = panelRefs.current.indexOf(entry.target as HTMLElement);
            if (idx === -1) return;
            setRevealed((prev) => {
              if (prev[idx]) return prev;
              const next = [...prev];
              next[idx] = true;
              return next;
            });
            setActiveScene(idx);
          }
        });
      },
      { threshold: 0.55 }
    );
    panelRefs.current.forEach((panel) => panel && io.observe(panel));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      spotlightRef.current?.style.setProperty("--mx", `${e.clientX}px`);
      spotlightRef.current?.style.setProperty("--my", `${e.clientY}px`);
    };
    addEventListener("mousemove", handleMouseMove);
    return () => removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    chatBodyRef.current?.scrollTo({ top: chatBodyRef.current.scrollHeight });
  }, [messages, sending]);

  const goToScene = (i: number) => {
    panelRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || sending) return;
    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(nextMessages);
    setInput("");
    setSending(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ||
            "Lo siento, hubo un problema. Intente de nuevo o llámenos al 219-0258.",
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Lo siento, hubo un problema de conexión. Intente de nuevo o llámenos al 219-0258.",
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <div className="stage">
        {SCENES.map((scene, i) => (
          <div
            key={scene.key}
            className={`scene s-${scene.key}${activeScene === i ? " active" : ""}`}
            data-scene={i}
          >
            <div className="img" />
            <div className="veil" />
          </div>
        ))}
      </div>
      <div className="spotlight" ref={spotlightRef} />

      <nav className="nav-dots">
        {SCENES.map((scene, i) => (
          <button
            key={scene.key}
            className={activeScene === i ? "on" : ""}
            onClick={() => goToScene(i)}
          >
            <span>{scene.label}</span>
          </button>
        ))}
      </nav>

      <main className="panels">
        <section
          className={`panel${revealed[0] ? " reveal" : ""}`}
          ref={(el) => {
            panelRefs.current[0] = el;
          }}
          data-scene={0}
        >
          <div className="eyebrow">Instituto de Neurocirugía · Dr. Javier Paino</div>
          <h1>Dr. Javier Paino Scarpati — Neurocirugía de Columna y Cerebro</h1>
          <p>
            Neurocirujano titular de Clínica San Felipe, formado en Mount
            Sinai (Nueva York) y con Doctorado (PhD) en Biología Molecular
            por George Washington University. Más de 25 años de experiencia
            en cirugía mínimamente invasiva de columna, tumores cerebrales y
            manejo del dolor.
          </p>
          <button
            className="chat-btn"
            onClick={() => goToScene(3)}
            style={{ marginTop: 24 }}
          >
            Agendar una cita →
          </button>
          <div className="scroll-hint">Desplácese para conocer más</div>
        </section>

        <section
          className={`panel${revealed[1] ? " reveal" : ""}`}
          ref={(el) => {
            panelRefs.current[1] = el;
          }}
          data-scene={1}
        >
          <div className="eyebrow">Sobre el Dr. Paino</div>
          <h2>Formación de nivel internacional, atención cercana</h2>
          <p>
            El Dr. Javier Eduardo Paino Scarpati es Neurocirujano Titular en
            Clínica San Felipe (Jesús María y La Molina) y Director de
            NeuroGen, equipo especializado en neuro-regeneración. Se formó en
            la Universidad Federal de Paraná (Brasil), realizó su residencia
            en Neurocirugía en Mount Sinai School of Medicine (Nueva York) y
            obtuvo su Doctorado (PhD) en Biología Molecular y Bioquímica en
            George Washington University. Es Profesor Adjunto de
            Investigación en George Washington University y en la
            Universidad de Ingeniería y Tecnología (UTEC), donde lidera un
            laboratorio de bioingeniería reconocido por CONCYTEC.
          </p>
          <ul className="fact-list">
            <li>CMP 027336 · RNE 19168</li>
            <li>Licencia médica Nueva York (NYS 228347)</li>
            <li>Idiomas: Español, Inglés, Portugués</li>
            <li>+100 cirugías al año en Clínica San Felipe</li>
          </ul>
        </section>

        <section
          className={`panel wide${revealed[2] ? " reveal" : ""}`}
          ref={(el) => {
            panelRefs.current[2] = el;
          }}
          data-scene={2}
        >
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
        </section>

        <section
          className={`panel${revealed[3] ? " reveal" : ""}`}
          ref={(el) => {
            panelRefs.current[3] = el;
          }}
          data-scene={3}
        >
          <div className="eyebrow">Consultorio del Dr. Paino</div>
          <h2>Ha llegado. Conversemos.</h2>
          <p>
            Pregúnteme sus dudas más comunes y le responderé con mi criterio.
            Este asistente da información general y no reemplaza una consulta
            médica.
          </p>
          <div className="doctor-card">
            <div className="ava">JP</div>
            <div>
              <b>Dr. Javier Paino</b>
              <p>Asistente virtual · disponible ahora</p>
            </div>
          </div>
          <button className="chat-btn" onClick={() => setChatOpen(true)}>
            Iniciar la consulta virtual →
          </button>
        </section>
      </main>

      {/* Preguntas frecuentes */}
      <section className="static-section" id="faq">
        <div className="eyebrow">Preguntas frecuentes</div>
        <h2>Antes de su cita</h2>
        <div className="faq-list">
          {FAQS.map((item, i) => (
            <div
              className={`faq-item${openFaq === i ? " open" : ""}`}
              key={item.q}
            >
              <button
                className="faq-question"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {item.q}
                <span className="faq-icon">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <p className="faq-answer">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Contacto / Citas */}
      <section className="static-section" id="contacto">
        <div className="eyebrow">Contacto</div>
        <h2>Agende su cita</h2>
        <div className="contact-grid">
          <div>
            <b>Dirección</b>
            <p>
              Av. Gregorio Escobedo 676, Torre 2, Piso 5, consultorio 511,
              Jesús María, Lima.
            </p>
          </div>
          <div>
            <b>Teléfonos</b>
            <p>219-0000 anexo 8477 · 219-0258 · 261-6139 · 261-5615</p>
          </div>
          <div>
            <b>Correo</b>
            <p>consultas@neurocirugiaperu.com</p>
          </div>
          <div>
            <b>Facebook</b>
            <p>
              <a
                href="https://www.facebook.com/JavierPainoNeurocirugia"
                target="_blank"
                rel="noopener noreferrer"
              >
                facebook.com/JavierPainoNeurocirugia
              </a>{" "}
              · 2.8 mil seguidores · 100% recomendado
            </p>
          </div>
        </div>
      </section>

      <div className={`chat${chatOpen ? " open" : ""}`}>
        <header>
          <div className="ava">JP</div>
          <div>
            <b>Dr. Paino</b>
            <br />
            <small>Asistente virtual con IA</small>
          </div>
          <span className="x" onClick={() => setChatOpen(false)}>
            ×
          </span>
        </header>
        <div className="body" ref={chatBodyRef}>
          {messages.map((m, i) => (
            <div className={`msg ${m.role === "user" ? "me" : "bot"}`} key={i}>
              {m.content}
            </div>
          ))}
          {sending && <div className="msg bot">Escribiendo…</div>}
        </div>
        <div className="input-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder="Escriba su pregunta…"
          />
          <button onClick={sendMessage} disabled={sending}>
            Enviar
          </button>
        </div>
        <div className="foot">
          Asistente virtual · información general, no reemplaza una consulta
          médica
        </div>
      </div>
    </>
  );
}
