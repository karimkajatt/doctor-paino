"use client";

import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/nav";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) =>
      document.querySelector(item.href)
    ).filter((el): el is Element => Boolean(el));

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    sections.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!drawerOpen) return;
    const close = () => setDrawerOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, [drawerOpen]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <header className={`site-header${scrolled ? " scrolled" : ""}`}>
        <div className="site-header__inner">
          <a href="#inicio" className="site-header__logo">
            <span className="monogram" aria-hidden="true">
              JP
            </span>
            Dr. Javier Paino
          </a>

          <nav className="nav-links" aria-label="Secciones del sitio">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={active === item.href ? "active" : ""}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contacto"
            className="btn btn-primary site-header__cta desktop-only"
          >
            Agendar cita
          </a>

          <button
            className={`hamburger${drawerOpen ? " open" : ""}`}
            aria-label={drawerOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <nav
        className={`mobile-drawer${drawerOpen ? " open" : ""}`}
        aria-label="Menú móvil"
      >
        {NAV_ITEMS.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setDrawerOpen(false)}>
            {item.label}
          </a>
        ))}
        <a href="#contacto" onClick={() => setDrawerOpen(false)}>
          Agendar cita →
        </a>
      </nav>
    </>
  );
}
