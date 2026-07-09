// Estructura modular del recorrido inmersivo: escenas + hotspots.
// Cada escena es un "ambiente" del consultorio. Para agregar una escena real
// a futuro (foto verdadera del consultorio), solo hay que:
//   1. Agregar un objeto aquí con su imagen y hotspots.
//   2. Agregar el panel de contenido correspondiente en components/tour/SceneTour.tsx
//      (o pasarlo como children desde app/page.tsx, según cómo se use).
//
// tipo de hotspot:
//   "info"   -> tarjeta informativa (no navega)
//   "nav"    -> salta a otra escena del recorrido
//   "accion" -> dispara una acción (agendar cita / ir a la sección de teleconsulta)

export type HotspotTipo = "info" | "nav" | "accion";

export type Hotspot = {
  id: string;
  x: number; // % desde la izquierda
  y: number; // % desde arriba
  tipo: HotspotTipo;
  titulo: string;
  detalle?: string;
  targetScene?: number; // para tipo "nav"
  accion?: "agendar" | "teleconsulta"; // para tipo "accion"
};

export type Scene = {
  key: string;
  label: string; // nombre mostrado en el minimapa
  image: {
    src: string;
    alt: string;
  };
  hotspots: Hotspot[];
};

export const SCENES: Scene[] = [
  {
    key: "recepcion",
    label: "Recepción",
    image: {
      // PLACEHOLDER — ver /IMAGENES.md para la foto real que debe reemplazar esta.
      src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=1920&auto=format&fit=crop",
      alt: "Recepción luminosa de una clínica moderna",
    },
    hotspots: [
      {
        id: "recepcion-info",
        x: 74,
        y: 66,
        tipo: "info",
        titulo: "Atención privada, no masificada",
        detalle: "Citas programadas, sin salas de espera saturadas.",
      },
      {
        id: "recepcion-nav",
        x: 24,
        y: 40,
        tipo: "nav",
        titulo: "Conocer al Dr. Paino",
        targetScene: 1,
      },
    ],
  },
  {
    key: "pasillo",
    label: "Pasillo",
    image: {
      src: "https://images.unsplash.com/photo-1777269749032-d8d458ae594d?q=80&w=1920&auto=format&fit=crop",
      alt: "Pasillo amplio y luminoso de clínica moderna",
    },
    hotspots: [
      {
        id: "pasillo-info",
        x: 30,
        y: 55,
        tipo: "info",
        titulo: "Formación internacional",
        detalle: "Mount Sinai (NY) · PhD George Washington University",
      },
      {
        id: "pasillo-nav",
        x: 80,
        y: 45,
        tipo: "nav",
        titulo: "Ver especialidades",
        targetScene: 2,
      },
    ],
  },
  {
    key: "quirofano",
    label: "Sala de procedimientos",
    image: {
      src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1920&auto=format&fit=crop",
      alt: "Sala de procedimientos quirúrgicos completamente equipada",
    },
    hotspots: [
      {
        id: "quirofano-info",
        x: 66,
        y: 60,
        tipo: "info",
        titulo: "Navegación por imágenes",
        detalle: "Instrumentación de precisión y monitoreo neurofisiológico intraoperatorio.",
      },
      {
        id: "quirofano-accion",
        x: 20,
        y: 70,
        tipo: "accion",
        titulo: "Agendar cita",
        accion: "agendar",
      },
    ],
  },
  {
    key: "consultorio",
    label: "Consultorio",
    image: {
      src: "https://images.unsplash.com/photo-1576085898384-b3cdb88736e9?q=80&w=1920&auto=format&fit=crop",
      alt: "Sala de consulta privada, luminosa, con ventana",
    },
    hotspots: [
      {
        id: "consultorio-accion",
        x: 68,
        y: 62,
        tipo: "accion",
        titulo: "Iniciar teleconsulta",
        accion: "teleconsulta",
      },
    ],
  },
];
