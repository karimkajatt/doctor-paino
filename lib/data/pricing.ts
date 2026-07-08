export type Modalidad = {
  title: string;
  desc: string;
  precio: string;
  destacado?: boolean;
};

export const MODALIDADES: Modalidad[] = [
  {
    title: "Primera consulta",
    desc: "Evaluación inicial completa: historia clínica, examen físico y revisión de estudios previos (RX/resonancia) para definir un plan de acción.",
    precio: "A consultar",
  },
  {
    title: "Consulta especializada",
    desc: "Para casos ya evaluados que requieren opinión experta en columna, cerebro, tumores o manejo del dolor, incluyendo revisión de imágenes recientes.",
    precio: "A consultar",
    destacado: true,
  },
  {
    title: "Control post-operatorio",
    desc: "Seguimiento de pacientes operados por el Dr. Paino: evolución de la herida, imágenes de control y ajuste de la rehabilitación.",
    precio: "A consultar",
  },
];

export const PRICING_NOTE = "Atención solo particular. Reembolso disponible con la mayoría de seguros.";
