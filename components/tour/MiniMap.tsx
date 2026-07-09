"use client";

import { SCENES } from "@/lib/data/scenes";

export default function MiniMap({
  active,
  onSelect,
  visible = true,
}: {
  active: number;
  onSelect: (i: number) => void;
  visible?: boolean;
}) {
  return (
    <nav
      className={`tour-minimap${visible ? "" : " hidden"}`}
      aria-label="Ambientes del recorrido"
      aria-hidden={!visible}
    >
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
