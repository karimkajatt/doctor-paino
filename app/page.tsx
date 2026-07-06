"use client";

import { useEffect, useRef, useState } from "react";

const SCENES = [
  { key: "fachada", label: "Bienvenida" },
  { key: "recepcion", label: "Recepción" },
  { key: "pasillo", label: "Pasillo" },
  { key: "consultorio", label: "Consultorio" },
];

export default function Home() {
  const [activeScene, setActiveScene] = useState(0);
  const [revealed, setRevealed] = useState<boolean[]>(() =>
    SCENES.map(() => false)
  );
  const [chatOpen, setChatOpen] = useState(false);
  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

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

  const goToScene = (i: number) => {
    panelRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
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
          <h1>Bienvenido. Pase, lo estábamos esperando.</h1>
          <p>
            No es una página web cualquiera: es la puerta de entrada a mi
            consultorio. Baje para recorrerlo conmigo.
          </p>
          <div className="scroll-hint">Desplácese para entrar</div>
        </section>

        <section
          className={`panel${revealed[1] ? " reveal" : ""}`}
          ref={(el) => {
            panelRefs.current[1] = el;
          }}
          data-scene={1}
        >
          <div className="eyebrow">Recepción</div>
          <h2>Una atención privada, no masificada</h2>
          <p>
            Aquí lo recibe nuestro equipo. Cada paciente es atendido de forma
            personal, con el tiempo que merece.
          </p>
          <div className="hotspots">
            <div className="hot" style={{ left: "62vw", top: "-40px" }}>
              <span className="label">Agende su cita sin esperas</span>
            </div>
          </div>
        </section>

        <section
          className={`panel${revealed[2] ? " reveal" : ""}`}
          ref={(el) => {
            panelRefs.current[2] = el;
          }}
          data-scene={2}
        >
          <div className="eyebrow">Nuestras instalaciones</div>
          <h2>Tecnología de precisión a cada paso</h2>
          <p>
            Camine por el instituto: equipos modernos, navegación por
            imágenes y salas preparadas para casos simples y complejos.
          </p>
          <div className="hotspots">
            <div className="hot" style={{ left: "20vw", top: "-60px" }}>
              <span className="label">Sala de terapia física</span>
            </div>
            <div className="hot" style={{ left: "70vw", top: "40px" }}>
              <span className="label">Monitoreo intraoperatorio</span>
            </div>
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
            Como si estuviera sentado frente a mí. Pregúnteme sus dudas más
            comunes y le responderé con mi criterio.
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
        <div className="body">
          <div className="msg bot">
            Hola, soy el asistente virtual del Dr. Paino. ¿En qué puedo
            ayudarle? Puede preguntarme sobre columna, cerebro, dolor o
            tumores.
          </div>
          <div className="msg me">
            Tengo una hernia de disco, ¿necesito operarme?
          </div>
          <div className="msg bot">
            La mayoría de las hernias mejora sin cirugía, con manejo del
            dolor y rehabilitación. Solo un grupo pequeño necesita operarse.
            Para saber su caso, lo ideal es evaluarlo con sus imágenes.
            ¿Desea agendar una cita?
          </div>
        </div>
        <div className="foot">
          Asistente virtual · información general, no reemplaza una consulta
          médica
        </div>
      </div>

      <div className="note">
        Demo · imágenes de referencia (se reemplazan por fotos reales del
        consultorio)
      </div>
    </>
  );
}
