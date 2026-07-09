"use client";

import { useState } from "react";
import type { Hotspot as HotspotData } from "@/lib/data/scenes";

export default function Hotspot({
  data,
  onNavigate,
  onAction,
}: {
  data: HotspotData;
  onNavigate: (sceneIndex: number) => void;
  onAction: (accion: "agendar" | "teleconsulta") => void;
}) {
  const [open, setOpen] = useState(false);

  const handleActivate = () => {
    if (data.tipo === "nav" && typeof data.targetScene === "number") {
      onNavigate(data.targetScene);
    } else if (data.tipo === "accion" && data.accion) {
      onAction(data.accion);
    } else {
      setOpen((v) => !v);
    }
  };

  const icon = data.tipo === "info" ? "+" : data.tipo === "nav" ? "→" : "✓";

  return (
    <div
      className={`hotspot hotspot--${data.tipo}${open ? " open" : ""}`}
      style={{ left: `${data.x}%`, top: `${data.y}%` }}
    >
      <button
        className="hotspot__dot"
        onClick={handleActivate}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        aria-label={data.titulo}
      >
        {icon}
      </button>
      <div className="hotspot__card" role="tooltip">
        <b>{data.titulo}</b>
        {data.detalle && <p>{data.detalle}</p>}
      </div>
    </div>
  );
}
