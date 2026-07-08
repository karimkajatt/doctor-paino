// Testimonios de EJEMPLO para mostrar el diseño de la sección.
// IMPORTANTE (leer antes de publicar en producción):
// 1. Reemplazar por reseñas reales de pacientes, con su consentimiento explícito.
// 2. Validar con el Dr. Paino / asesoría legal si la publicidad con testimonios
//    de pacientes tiene restricciones bajo la normativa médica peruana antes
//    de dejar esta sección con datos reales en el sitio público.

export type Testimonio = {
  nombre: string;
  texto: string;
  rating: 1 | 2 | 3 | 4 | 5;
  procedimiento?: string;
};

export const TESTIMONIOS: Testimonio[] = [
  {
    nombre: "Paciente de ejemplo — María R.",
    texto:
      "Llegué con un dolor de espalda que no me dejaba caminar bien. El Dr. Paino me explicó todo con calma y la recuperación fue mucho más rápida de lo que esperaba.",
    rating: 5,
    procedimiento: "Cirugía mínimamente invasiva de columna",
  },
  {
    nombre: "Paciente de ejemplo — Jorge L.",
    texto:
      "Buscaba una segunda opinión antes de operarme. El doctor revisó mis resonancias con detalle y me ayudó a decidir con información clara, sin apuro.",
    rating: 5,
    procedimiento: "Segunda opinión — hernia de disco",
  },
  {
    nombre: "Paciente de ejemplo — Carmen V.",
    texto:
      "El seguimiento después de la operación fue constante. Siempre pude comunicarme para resolver dudas durante la recuperación.",
    rating: 5,
    procedimiento: "Control post-operatorio",
  },
  {
    nombre: "Paciente de ejemplo — Renato S.",
    texto:
      "Atención cercana desde la primera cita. Se nota la experiencia y el cuidado en cada explicación.",
    rating: 4,
    procedimiento: "Manejo del dolor",
  },
];
