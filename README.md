# Sitio del Dr. Javier Paino

Sitio web (Next.js 16, App Router) del Dr. Javier Paino Scarpati,
neurocirujano en Lima. Incluye un recorrido inmersivo del consultorio,
asistente virtual con IA, y secciones de especialidades, testimonios,
modalidades de consulta, preguntas frecuentes y contacto.

## Cómo correr el proyecto

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Para producción:

```bash
npm run build
npm start
```

## Variables de entorno

Copia `.env.local.example` como `.env.local` y completa:

| Variable | Para qué sirve | Obligatoria |
|---|---|---|
| `OPEN_ROUTER_KEY` | Clave de OpenRouter para el asistente de IA (`app/api/chat/route.ts`). Se obtiene en [openrouter.ai/keys](https://openrouter.ai/keys). Sin esta clave, el chat responde con un mensaje pidiendo llamar al consultorio. | Sí, para que el chat funcione |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de WhatsApp del consultorio en formato internacional sin "+" (ej. `51987654321`). **Pendiente de confirmación del cliente** — hoy tiene un placeholder. | Sí, antes de publicar |
| `NEXT_PUBLIC_SITE_URL` | Dominio final del sitio (para SEO, sitemap, Open Graph). | Sí, antes de publicar |
| `NEXT_PUBLIC_GA_ID` | ID de Google Analytics 4 (`G-XXXXXXX`). Si no se define, GA4 simplemente no se carga (Vercel Analytics igual funciona sin esta variable). | No |

## Dónde editar cada cosa

Todo el contenido "de negocio" vive en `lib/data/`, separado del diseño:

- **Datos de contacto (teléfonos, dirección, WhatsApp, horarios)** → `lib/data/contact.ts`. Es la única fuente de verdad: todo el sitio (hero, contacto, footer, chat) lee de aquí. Cambia un teléfono una sola vez y se actualiza en todo el sitio.
- **Especialidades** → `lib/data/services.ts`
- **Preguntas frecuentes / base de conocimiento del chat** → `lib/data/faqs.ts`. Agregar un objeto `{ q, a }` lo suma automáticamente a la sección de FAQ **y** al contexto que recibe el asistente de IA.
- **Testimonios** → `lib/data/testimonials.ts` (⚠️ hoy son ejemplos ilustrativos, ver advertencia abajo)
- **Modalidades de consulta / precios** → `lib/data/pricing.ts`
- **Escenas del recorrido inmersivo y sus hotspots** → `lib/data/scenes.ts`
- **System prompt del asistente de IA** → `app/api/chat/route.ts` (constante `SYSTEM_PROMPT`)

## Imágenes

Ver [`IMAGENES.md`](./IMAGENES.md) para la tabla completa de qué placeholder
de Unsplash reemplazar por qué foto real, y cómo hacerlo.

## Chat con IA

- Usa el SDK de Google Gemini (`@google/genai`), modelo `gemini-2.5-flash`.
- El endpoint `app/api/chat/route.ts` inyecta toda la base de FAQs
  (`lib/data/faqs.ts`) como contexto del sistema. Hay un comentario `TODO RAG`
  en ese archivo marcando dónde reemplazar esto por recuperación vectorial si
  la base de conocimiento crece mucho.
- Incluye un limitador de tasa simple en memoria (`lib/rate-limit.ts`) y
  validación de entrada. Es una protección básica, no distribuida (ver
  comentario en el archivo).
- Hay un punto de integración comentado en `components/chat/ChatWidget.tsx`
  para agregar voz o avatar a futuro (ElevenLabs, HeyGen, D-ID).

## Pendientes que requieren decisión del cliente

- **Fotos reales** del consultorio, quirófano/sala de procedimientos, pasillo
  y recepción (ver `IMAGENES.md`).
- **Número de WhatsApp** real del consultorio.
- **Dominio de producción** para `NEXT_PUBLIC_SITE_URL`.
- **Teléfonos `261-6139` / `261-5615`**: se eliminaron del sitio por no
  poder confirmarse como vigentes (se detectó inconsistencia con los
  oficiales `219-0000 anexo 8477` y `219-0258`). Confirmar si deben
  reincorporarse.
- **Testimonios**: los que aparecen hoy son de ejemplo, para mostrar el
  diseño de la sección. Antes de publicar, reemplazar por reseñas reales de
  pacientes con su consentimiento explícito, y confirmar con asesoría legal
  que la publicidad con testimonios de pacientes no tiene restricciones bajo
  la normativa médica peruana.
- **Aviso legal** (`app/aviso-legal/page.tsx`): es una plantilla base: debe
  revisarla un abogado antes de publicarse como definitiva.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Google Gemini (`@google/genai`)
· GSAP + ScrollTrigger · Lenis (smooth scroll) · Vercel Analytics.
