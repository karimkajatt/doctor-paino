// Fuente única de verdad para todos los datos de contacto del consultorio.
// Cualquier componente o texto que necesite un teléfono, dirección, correo, etc.
// debe importar de aquí en vez de escribirlo de nuevo, para que nunca queden
// datos desincronizados entre secciones.

export const CONTACT = {
  doctorName: "Dr. Javier Paino",
  doctorFullName: "Dr. Javier Eduardo Paino Scarpati",
  yearsExperience: "más de 30 años",
  clinicName: "Clínica San Felipe",
  address: {
    line1: "Av. Gregorio Escobedo 676, Torre 2, Piso 5, consultorio 511",
    line2: "Jesús María, Lima, Perú",
    full: "Av. Gregorio Escobedo 676, Torre 2, Piso 5, consultorio 511, Jesús María, Lima",
    mapsQuery: "Av. Gregorio Escobedo 676, Jesús María, Lima, Perú",
  },
  phones: {
    main: "219-0000 anexo 8477",
    mainDial: "0112190000",
    direct: "219-0258",
    directDial: "0112190258",
  },
  email: "consultas@neurocirugiaperu.com",
  // Número a confirmar por el cliente. Formato E.164 sin "+" para el enlace wa.me.
  whatsapp: {
    number: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "51999999999",
    defaultMessage:
      "Hola, quisiera agendar una cita con el Dr. Javier Paino.",
  },
  facebook: {
    url: "https://www.facebook.com/JavierPainoNeurocirugia",
    handle: "facebook.com/JavierPainoNeurocirugia",
    followers: "2.8 mil seguidores",
    rating: "100% recomendado",
  },
  credentials: ["CMP 027336", "RNE 19168", "Licencia médica NY (NYS 228347)"],
  languages: ["Español", "Inglés", "Portugués"],
  hours: {
    weekdays: "Lunes a viernes, previa cita",
    note: "Atención solo particular (no EPS ni seguros directos; reembolso disponible)",
  },
} as const;

export function waLink(message = CONTACT.whatsapp.defaultMessage) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${CONTACT.whatsapp.number}?text=${encoded}`;
}

export function telLink(dial: string) {
  return `tel:+51${dial.replace(/^0/, "")}`;
}
