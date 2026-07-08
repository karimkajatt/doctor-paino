"use client";

import { SCENES } from "@/lib/data/scenes";

export default function MiniMap({
  active,
  onSelect,
}: {
  active: number;
  onSelect: (i: number) => void;
}) {
  return (
    <nav className="tour-minimap" aria-label="Ambientes del recorrido">
      {SCENES.map((scene, i) => (
        <button
          key={scene.key}
          className={`tour-minimap__item${active === i ? " on" : ""}`}
          onClick={() => onSelect(i)}
          aria-current={active === i ? "true" : undefined}
        >
          <span className="tour-minimap__label">{scene.label}</span>
          <span className="tour-minimap__dot" aria-hidden="true" />
        </button>
      ))}
    </nav>
  );
}
