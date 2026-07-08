export type Servicio = {
  title: string;
  desc: string;
};

export const SERVICIOS: Servicio[] = [
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

export const INSTITUCIONES = [
  "Mount Sinai School of Medicine",
  "George Washington University",
  "UTEC — Universidad de Ingeniería y Tecnología",
  "Gamma Knife",
  "CONCYTEC",
];
