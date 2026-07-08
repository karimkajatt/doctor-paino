import { INSTITUCIONES } from "@/lib/data/services";

export default function Institutions() {
  return (
    <div className="instituciones" aria-label="Instituciones y formación asociadas">
      {INSTITUCIONES.map((nombre) => (
        <span key={nombre}>{nombre}</span>
      ))}
    </div>
  );
}
