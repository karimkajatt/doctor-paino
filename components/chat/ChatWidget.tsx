"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { CONTACT } from "@/lib/data/contact";

// Evento global para abrir el chat desde cualquier componente (hotspots del
// recorrido, botones "Hablar con el asistente", etc.) sin acoplar el árbol
// de componentes entre app/layout.tsx y app/page.tsx.
export const OPEN_CHAT_EVENT = "doctor-chat:open";

type ChatMessage = { role: "user" | "assistant"; content: string; error?: boolean };

const STORAGE_KEY = "paino-chat-messages";
const REQUEST_TIMEOUT_MS = 15_000;

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Hola, soy el asistente virtual del Dr. Paino. ¿En qué puedo ayudarle? Puede preguntarme sobre columna, cerebro, dolor o tumores.",
  },
];

const SUGGESTED_CHIPS = [
  "¿Qué es una hernia de disco?",
  "¿Cómo es la recuperación de una cirugía de columna?",
  "¿Qué es el Gamma Knife?",
  "¿Dónde y cómo agendo mi cita?",
];

function formatElapsed(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export default function ChatWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [lastUserText, setLastUserText] = useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    const open = () => setChatOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, open);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, open);
  }, []);

  // Cronómetro de la "consulta", como en una videollamada real. Arranca de
  // cero cada vez que se abre y se detiene al cerrar.
  useEffect(() => {
    if (!chatOpen) return;
    setElapsedSeconds(0);
    const interval = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [chatOpen]);

  // Restaura el historial de la sesión (se pierde al cerrar la pestaña, a
  // propósito — no es un dato que deba persistir entre visitas distintas).
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch {
      // sessionStorage no disponible (modo privado, etc.) — se ignora.
    }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // idem
    }
  }, [messages]);

  useEffect(() => {
    chatBodyRef.current?.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  const sendMessage = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || sending) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setLastUserText(text);
    setInput("");
    setSending(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      // Punto de integración RAG: hoy el servidor inyecta la base de FAQs
      // completa como contexto (ver app/api/chat/route.ts). A futuro, este
      // mismo endpoint podría recibir solo los fragmentos más relevantes
      // recuperados de un vector store, sin cambiar este fetch.
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
        signal: controller.signal,
      });

      if (res.status === 429) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "Estamos recibiendo muchas consultas en este momento. Espere un minuto e intente de nuevo, o llámenos al " +
              CONTACT.phones.direct + ".",
            error: true,
          },
        ]);
        return;
      }

      const data = await res.json();
      if (data.debug) {
        console.error("[chat/api]", data.debug);
      }
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ||
            `Lo siento, hubo un problema. Intente de nuevo o llámenos al ${CONTACT.phones.direct}.`,
        },
      ]);
    } catch (err) {
      console.error("[chat/fetch]", err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Lo siento, hubo un problema de conexión. Intente de nuevo o llámenos al ${CONTACT.phones.direct}.`,
          error: true,
        },
      ]);
    } finally {
      clearTimeout(timeout);
      setSending(false);
    }
  };

  const handleRetry = () => {
    if (!lastUserText) return;
    setMessages((prev) => prev.filter((m) => !m.error));
    sendMessage(lastUserText);
  };

  const showChips = messages.length === 1;
  const lastMessage = messages[messages.length - 1];

  return (
    <>
      <button
        className="chat-fab"
        onClick={() => setChatOpen((v) => !v)}
        aria-label={chatOpen ? "Cerrar consulta virtual" : "Iniciar consulta virtual"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-4 4V6a1 1 0 0 1 1-1Z" />
        </svg>
      </button>

      <div
        className={`consult-overlay${chatOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Consulta virtual con el Dr. Paino"
        aria-hidden={!chatOpen}
      >
        <div className="consult-card">
          <div className="consult-topbar">
            <span className="consult-timer">{formatElapsed(elapsedSeconds)}</span>
            <button className="consult-close" onClick={() => setChatOpen(false)} aria-label="Cerrar consulta virtual">
              ×
            </button>
          </div>

          <div className="consult-video">
            <Image
              src="/images/dr-paino.png"
              alt="Dr. Javier Paino en la consulta virtual"
              fill
              sizes="(max-width: 640px) 100vw, 820px"
              className="consult-video__photo"
            />
            <div className="consult-video__scrim" />
            <div className="consult-video__doctor">
              <b>Dr. Javier Paino</b>
              <span className="consult-status-label">
                <span className="consult-status-dot" aria-hidden="true" />
                En línea
              </span>
            </div>
            <div className="consult-pip" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5Z" />
              </svg>
              <span>Tú</span>
            </div>
          </div>

          <div className="consult-transcript" ref={chatBodyRef}>
            {messages.map((m, i) => (
              <div className={`consult-msg ${m.role === "user" ? "me" : "bot"}${m.error ? " error" : ""}`} key={i}>
                {m.content}
              </div>
            ))}
            {sending && (
              <div className="consult-msg bot" aria-live="polite">
                <span className="typing-dots">
                  <span />
                  <span />
                  <span />
                </span>
              </div>
            )}
            {lastMessage?.error && !sending && (
              <button className="retry-btn" onClick={handleRetry}>
                Reintentar
              </button>
            )}
          </div>

          {showChips && !sending && (
            <div className="chat-chips">
              {SUGGESTED_CHIPS.map((chip) => (
                <button key={chip} className="chat-chip" onClick={() => sendMessage(chip)}>
                  {chip}
                </button>
              ))}
            </div>
          )}

          {/*
            Punto de integración futura: voz / avatar.
            Aquí podría montarse un reproductor de audio (ElevenLabs TTS sobre
            `data.reply`) o un avatar de video en vivo (HeyGen / D-ID) que
            reciba el mismo texto de respuesta del asistente, en vez de la
            foto fija usada hoy en .consult-video.
          */}

          <div className="consult-input-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
              placeholder="Escriba su pregunta…"
              aria-label="Escriba su pregunta para el Dr. Paino"
              disabled={sending}
            />
            <button onClick={() => sendMessage()} disabled={sending || !input.trim()}>
              Enviar
            </button>
          </div>

          <div className="consult-controls">
            <div className="call-control">
              <button aria-label="Micrófono" onClick={(e) => e.preventDefault()}>
                <svg viewBox="0 0 24 24">
                  <path d="M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-2.08A7 7 0 0 0 19 12h-2Z" />
                </svg>
              </button>
              <span className="call-control__tooltip">Consulta por texto disponible ahora</span>
            </div>

            <button className="hangup-btn" onClick={() => setChatOpen(false)} aria-label="Terminar consulta virtual">
              <svg viewBox="0 0 24 24">
                <path d="M12 9c-2.5 0-4.9.6-7 1.7a1.5 1.5 0 0 0-.8 1.7l.6 2.4a1.5 1.5 0 0 0 1.7 1.1l2.4-.4a1.5 1.5 0 0 0 1.2-1.3l.2-1.6a9.7 9.7 0 0 1 3.4 0l.2 1.6a1.5 1.5 0 0 0 1.2 1.3l2.4.4a1.5 1.5 0 0 0 1.7-1.1l.6-2.4a1.5 1.5 0 0 0-.8-1.7A16.3 16.3 0 0 0 12 9Z" />
              </svg>
            </button>

            <div className="call-control">
              <button aria-label="Cámara" onClick={(e) => e.preventDefault()}>
                <svg viewBox="0 0 24 24">
                  <path d="M4 6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-2.5l4 2.5V8l-4 2.5V8a2 2 0 0 0-2-2H4Z" />
                </svg>
              </button>
              <span className="call-control__tooltip">Consulta por texto disponible ahora</span>
            </div>
          </div>

          <div className="consult-meta">
            <small>Asistente virtual · información general, no reemplaza una consulta médica</small>
            <a href="#contacto" className="btn btn-ghost btn-sm chat-schedule-btn" onClick={() => setChatOpen(false)}>
              Agendar cita presencial →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
