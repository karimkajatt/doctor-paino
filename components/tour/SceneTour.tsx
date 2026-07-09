"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SCENES } from "@/lib/data/scenes";
import Hotspot from "./Hotspot";
import MiniMap from "./MiniMap";

gsap.registerPlugin(ScrollTrigger);

export type TourPanel = {
  id: string;
  wide?: boolean;
  content: React.ReactNode;
};

export default function SceneTour({ panels }: { panels: TourPanel[] }) {
  const [activeScene, setActiveScene] = useState(0);
  const [revealed, setRevealed] = useState<boolean[]>(() => SCENES.map(() => false));
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showMinimap, setShowMinimap] = useState(true);

  const panelRefs = useRef<(HTMLElement | null)[]>([]);
  const mediaWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mediaDragRefs = useRef<(HTMLDivElement | null)[]>([]);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  // Revela cada panel cuando entra al viewport y sincroniza la escena activa.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = panelRefs.current.indexOf(entry.target as HTMLElement);
          if (idx === -1) return;
          setRevealed((prev) => {
            if (prev[idx]) return prev;
            const next = [...prev];
            next[idx] = true;
            return next;
          });
          setActiveScene(idx);
        });
      },
      { threshold: 0.55 }
    );
    panelRefs.current.forEach((panel) => panel && io.observe(panel));
    return () => io.disconnect();
  }, []);

  // El minimapa (fixed) solo tiene sentido mientras el recorrido está en
  // pantalla. Se oculta una vez que se llega a las secciones estáticas de
  // abajo (testimonios, precios, etc.), para no superponerse con su texto.
  useEffect(() => {
    const checkVisibility = () => {
      const lastPanel = panelRefs.current[panelRefs.current.length - 1];
      if (!lastPanel) return;
      setShowMinimap(lastPanel.getBoundingClientRect().bottom > 80);
    };
    checkVisibility();
    window.addEventListener("scroll", checkVisibility, { passive: true });
    window.addEventListener("resize", checkVisibility);
    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkVisibility);
    };
  }, []);

  // Autorotación suave del fondo mientras el usuario no ha interactuado todavía.
  useEffect(() => {
    if (hasInteracted) return;
    const interval = setInterval(() => {
      setActiveScene((prev) => (prev + 1) % SCENES.length);
    }, 4500);

    const stop = () => {
      setHasInteracted(true);
      clearInterval(interval);
    };
    window.addEventListener("wheel", stop, { passive: true, once: true });
    window.addEventListener("touchstart", stop, { passive: true, once: true });
    window.addEventListener("keydown", stop, { once: true });
    window.addEventListener("pointerdown", stop, { once: true });
    window.addEventListener("scroll", stop, { passive: true, once: true });

    return () => {
      clearInterval(interval);
      window.removeEventListener("wheel", stop);
      window.removeEventListener("touchstart", stop);
      window.removeEventListener("keydown", stop);
      window.removeEventListener("pointerdown", stop);
      window.removeEventListener("scroll", stop);
    };
  }, [hasInteracted]);

  // Una vez el usuario interactúa, la escena activa vuelve a depender solo del
  // IntersectionObserver de arriba (que ya seguirá corriendo con normalidad).
  useEffect(() => {
    if (!hasInteracted) return;
    const idx = panelRefs.current.findIndex((el) => {
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.55 && rect.bottom > window.innerHeight * 0.45;
    });
    if (idx !== -1) setActiveScene(idx);
  }, [hasInteracted]);

  // Linterna + parallax de profundidad al mover el mouse (solo escritorio).
  useEffect(() => {
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    let raf = 0;
    const handleMouseMove = (e: MouseEvent) => {
      spotlightRef.current?.style.setProperty("--mx", `${e.clientX}px`);
      spotlightRef.current?.style.setProperty("--my", `${e.clientY}px`);

      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const dx = (e.clientX / window.innerWidth - 0.5) * 2;
        const dy = (e.clientY / window.innerHeight - 0.5) * 2;
        const el = mediaDragRefs.current[activeScene];
        if (el) {
          el.style.transform = `translate3d(${dx * -10}px, ${dy * -10}px, 0)`;
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [activeScene]);

  // Parallax de scroll (capa de fondo más lenta que el contenido) vía GSAP.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const triggers = mediaWrapRefs.current.map((el, i) => {
      const panel = panelRefs.current[i];
      if (!el || !panel) return null;
      return gsap.fromTo(
        el,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => {
      triggers.forEach((t) => t?.scrollTrigger?.kill());
      triggers.forEach((t) => t?.kill());
    };
  }, []);

  const goToScene = (i: number) => {
    setHasInteracted(true);
    panelRefs.current[i]?.scrollIntoView({ behavior: "smooth" });
  };

  const handleAction = (accion: "agendar" | "teleconsulta") => {
    const targetId = accion === "teleconsulta" ? "#teleconsulta" : "#contacto";
    document.querySelector(targetId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="tour">
      <div className="tour-stage" aria-hidden="true">
        {SCENES.map((scene, i) => (
          <div key={scene.key} className={`tour-scene${activeScene === i ? " active" : ""}`}>
            <div
              className="tour-scene__media-wrap"
              ref={(el) => {
                mediaWrapRefs.current[i] = el;
              }}
            >
              <div
                className="tour-scene__media-drag"
                ref={(el) => {
                  mediaDragRefs.current[i] = el;
                }}
                style={{ position: "absolute", inset: "-6%" }}
              >
                <Image
                  src={scene.image.src}
                  alt={scene.image.alt}
                  fill
                  sizes="100vw"
                  priority={i === 0}
                  quality={80}
                />
              </div>
            </div>
            <div className="tour-scene__scrim" />
            <div className="tour-scene__scrim-bottom" />
            {activeScene === i &&
              scene.hotspots.map((h) => (
                <Hotspot key={h.id} data={h} onNavigate={goToScene} onAction={handleAction} />
              ))}
          </div>
        ))}
      </div>

      <div className="tour-spotlight" ref={spotlightRef} />

      <MiniMap active={activeScene} onSelect={goToScene} visible={showMinimap} />

      <main id="main-content" className="tour-panels">
        {panels.map((panel, i) => (
          <section
            key={panel.id}
            id={panel.id}
            className={`tour-panel-outer${revealed[i] ? " reveal" : ""}`}
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
          >
            <div className={`tour-panel glass-panel${panel.wide ? " wide" : ""}`}>
              {panel.content}
            </div>
            {i === 0 && <div className="scroll-hint">Desplácese para conocer más</div>}
          </section>
        ))}
      </main>
    </div>
  );
}
