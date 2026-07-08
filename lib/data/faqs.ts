// Base de conocimiento del sitio y del asistente de IA.
// Se muestra en la sección de Preguntas Frecuentes y se inyecta también
// como contexto al modelo en app/api/chat/route.ts, para que el chat
// responda con el mismo criterio y tono que esta lista.
//
// Para agregar una pregunta nueva: solo añade un objeto { q, a } al arreglo.
// Se reflejará automáticamente en la web y en el chat.

export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "¿Cubrirá mi seguro las consultas médicas y la cirugía?",
    a: "La atención es particular. Trabajamos con la mayoría de las compañías de seguros mediante el sistema de reembolso: usted paga la consulta y luego tramita la devolución con su aseguradora. Cualquier duda sobre su caso puntual, comuníquese al consultorio.",
  },
  {
    q: "¿Qué debo hacer para agendar mi cita?",
    a: "Tenga a la mano el nombre del paciente y sus datos de contacto (teléfono y correo). Si tiene orden de laboratorio o resonancia, verifique que los resultados no tengan más de 6 meses de antigüedad. Para citas urgentes, puede anotarse en lista de espera con la secretaria. Si no puede asistir, avise con anticipación para reprogramar.",
  },
  {
    q: "¿Dónde puedo hacerme exámenes de RX y Resonancia Magnética?",
    a: "En DPI, Av. Dos de Mayo 602, San Isidro, tel. 202-3333. Trabajan con todas las compañías de seguros y EPS. También puede traer estudios de otro centro, siempre que no tengan más de 6 meses.",
  },
  {
    q: "¿Hay instrucciones previas a una cirugía?",
    a: "Sí. Suspender antiinflamatorios o aspirina 10 días antes. El día de la operación, desayuno liviano a las 6:00 am (jugo, manzanilla, 2 tostadas) y luego nada de líquidos. Traer corsé rígido bivalvo a medida (Ortopedia Wong, tel. 4404190 / 98182689, demora ~10 días en confeccionarse).",
  },
  {
    q: "¿Qué es una hernia de disco y cómo sé si la tengo?",
    a: "Es el desplazamiento del núcleo de un disco intervertebral que puede comprimir una raíz nerviosa, causando dolor, hormigueo o debilidad que a veces baja por la pierna o el brazo. El diagnóstico se confirma con una resonancia magnética y una evaluación clínica; no todas las hernias requieren cirugía.",
  },
  {
    q: "¿Toda hernia de disco necesita operarse?",
    a: "No. La mayoría mejora con tratamiento conservador (terapia física, manejo del dolor, tiempo). La cirugía se considera cuando hay dolor incapacitante que no responde a tratamiento, pérdida de fuerza progresiva o compromiso neurológico importante.",
  },
  {
    q: "¿Cómo es la recuperación de una cirugía de columna mínimamente invasiva?",
    a: "Al ser mínimamente invasiva, la mayoría de pacientes camina el mismo día o al día siguiente y el alta suele darse en 24 a 48 horas. La recuperación completa varía según el caso, pero muchos pacientes retoman actividades livianas en pocas semanas, siempre con seguimiento y rehabilitación guiada.",
  },
  {
    q: "¿Qué es el Gamma Knife y cuándo se usa?",
    a: "Es un equipo de radiocirugía que aplica dosis muy precisas de radiación sobre tumores o lesiones cerebrales sin necesidad de abrir el cráneo. Se usa en ciertos tumores, malformaciones vasculares y algunos casos de dolor facial, evaluando siempre si es la mejor opción frente a la cirugía convencional.",
  },
  {
    q: "¿El Dr. Paino atiende dolor crónico sin cirugía?",
    a: "Sí. El manejo del dolor incluye bloqueos y terapias percutáneas para neuralgias, radiculopatías, cefaleas refractarias, túnel del carpo y dolor post-derrame cerebral, muchas veces evitando o posponiendo una cirugía.",
  },
  {
    q: "¿Qué anestesia se usa y qué riesgos tiene una neurocirugía?",
    a: "Depende del procedimiento; se define junto con el equipo de anestesiología tras evaluar su historia clínica. Toda cirugía tiene riesgos, que se explican en detalle durante la consulta prequirúrgica, junto con las medidas para reducirlos (monitoreo neurofisiológico, navegación por imágenes, etc.).",
  },
  {
    q: "¿Puedo traer estudios de otra clínica o pedir una segunda opinión?",
    a: "Sí, es bienvenido traer sus resonancias, tomografías o informes previos de cualquier centro (con menos de 6 meses de antigüedad) para una segunda opinión especializada en columna, cerebro o dolor.",
  },
  {
    q: "¿Atienden niños o solo adultos?",
    a: "La práctica del Dr. Paino está enfocada principalmente en pacientes adultos. Ante un caso pediátrico, consulte directamente al equipo para orientación o derivación adecuada.",
  },
  {
    q: "¿Cómo es el control post-operatorio?",
    a: "Se programan controles periódicos para evaluar la evolución, retirar puntos si corresponde, revisar imágenes de control y ajustar la rehabilitación. La frecuencia depende del tipo de cirugía realizada.",
  },
  {
    q: "¿Dónde queda el consultorio y hay dónde estacionar?",
    a: "El consultorio está en Clínica San Felipe, Av. Gregorio Escobedo 676, Torre 2, Piso 5, consultorio 511, Jesús María. La clínica cuenta con playa de estacionamiento para pacientes.",
  },
  {
    q: "¿Cuándo debo buscar atención de urgencia en vez de agendar una cita normal?",
    a: "Ante síntomas súbitos y severos —debilidad repentina, pérdida de control de esfínteres, dolor de cabeza súbito e intenso, o alteración de conciencia— acuda de inmediato a una emergencia; no espere una cita ambulatoria.",
  },
  {
    q: "¿La primera consulta incluye ya un plan de tratamiento?",
    a: "En la primera consulta se evalúa su historia, examen físico e imágenes disponibles, y se conversa un plan inicial. Si se requieren más estudios, se indican antes de definir el tratamiento final.",
  },
];
