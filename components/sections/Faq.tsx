"use client";

import { useState } from "react";
import { FAQS } from "@/lib/data/faqs";

export default function Faq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="section" id="faq">
      <div className="section__inner">
        <div className="eyebrow">Preguntas frecuentes</div>
        <h2>Antes de su cita</h2>
        <div className="faq-list">
          {FAQS.map((item, i) => {
            const panelId = `faq-panel-${i}`;
            const isOpen = openFaq === i;
            return (
              <div className={`faq-item${isOpen ? " open" : ""}`} key={item.q}>
                <button
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                >
                  {item.q}
                  <span className="faq-icon" aria-hidden="true">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <p className="faq-answer" id={panelId}>
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
