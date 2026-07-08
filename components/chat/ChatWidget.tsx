"use client";

import { useEffect, useRef, useState } from "react";
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

export default function ChatWidget() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [lastUserText, setLastUserText] = useState<string | null>(null);
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const hydrated = useRef(false);

  useEffect(() => {
    const open = () => setChatOpen(true);
    window.addEventListener(OPEN_CHAT_EVENT, open);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, open);
  }, []);

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
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ||
            `Lo siento, hubo un problema. Intente de nuevo o llámenos al ${CONTACT.phones.direct}.`,
        },
      ]);
    } catch {
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
        aria-label={chatOpen ? "Cerrar asistente virtual" : "Abrir asistente virtual"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-4 4V6a1 1 0 0 1 1-1Z" />
        </svg>
      </button>

      <div className={`chat${chatOpen ? " open" : ""}`} role="dialog" aria-label="Asistente virtual del Dr. Paino" aria-hidden={!chatOpen}>
        <header>
          <div className="ava" aria-hidden="true">
            JP
          </div>
          <div>
            <b>Dr. Paino</b>
            <br />
            <small>Asistente virtual con IA</small>
          </div>
          <button className="x" onClick={() => setChatOpen(false)} aria-label="Cerrar chat">
            ×
          </button>
        </header>

        <div className="body" ref={chatBodyRef}>
          {messages.map((m, i) => (
            <div className={`msg ${m.role === "user" ? "me" : "bot"}${m.error ? " error" : ""}`} key={i}>
              {m.content}
            </div>
          ))}
          {sending && (
            <div className="msg bot" aria-live="polite">
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

        <a href="#contacto" className="btn btn-ghost btn-sm chat-schedule-btn" onClick={() => setChatOpen(false)}>
          Agendar cita →
        </a>

        {/*
          Punto de integración futura: voz / avatar.
          Aquí podría montarse un reproductor de audio (ElevenLabs TTS sobre
          `data.reply`) o un avatar de video en vivo (HeyGen / D-ID) que
          reciba el mismo texto de respuesta del asistente.
        */}

        <div className="input-row">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            placeholder="Escriba su pregunta…"
            aria-label="Escriba su pregunta para el asistente virtual"
            disabled={sending}
          />
          <button onClick={() => sendMessage()} disabled={sending || !input.trim()}>
            Enviar
          </button>
        </div>
        <div className="foot">
          Asistente virtual · información general, no reemplaza una consulta médica
        </div>
      </div>
    </>
  );
}
