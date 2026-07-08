import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Eres el asistente virtual del sitio web del Dr. Javier Eduardo Paino Scarpati, neurocirujano titular en Clínica San Felipe (Jesús María y La Molina, Lima, Perú), especializado en cirugía mínimamente invasiva de columna, tumores cerebrales y de columna, manejo del dolor y neurorrehabilitación.

Reglas:
- Responde siempre en español, con tono cercano, claro y profesional.
- Da información general y educativa. NUNCA des un diagnóstico definitivo ni reemplaces una consulta médica real.
- Ante síntomas o casos concretos, orienta con información general y recomienda agendar una cita para evaluación presencial.
- Si preguntan por precios exactos, seguros o disponibilidad, indica que deben confirmarlo llamando al consultorio.
- Datos de contacto para agendar cita: teléfonos 219-0000 anexo 8477, 219-0258, 261-6139, 261-5615; correo consultas@neurocirugiaperu.com; dirección Av. Gregorio Escobedo 676, Torre 2, Piso 5, consultorio 511, Jesús María.
- Sé breve: 2 a 4 oraciones por respuesta, salvo que te pidan más detalle.`;

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          reply:
            "El asistente aún no está configurado (falta la clave de API). Por favor comuníquese al 219-0258 mientras lo habilitamos.",
        },
        { status: 200 }
      );
    }

    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { reply: "No recibí ningún mensaje. ¿En qué puedo ayudarle?" },
        { status: 200 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const contents = (messages as ChatMessage[]).map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 400,
      },
    });

    const reply = response.text?.trim();

    return NextResponse.json({
      reply:
        reply ||
        "Lo siento, no pude generar una respuesta. Intente de nuevo o llámenos al 219-0258.",
    });
  } catch (err) {
    console.error("Error en /api/chat:", err);
    return NextResponse.json(
      {
        reply:
          "Lo siento, hubo un problema técnico. Intente de nuevo o comuníquese al 219-0258.",
      },
      { status: 200 }
    );
  }
}
