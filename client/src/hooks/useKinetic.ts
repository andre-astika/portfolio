/*
  NOIR KINETIC — shared motion hooks.
  Custom cursor (lerp dot), reveal-on-scroll observer, magnetic buttons, mouse parallax.
  All gated behind prefers-reduced-motion.
*/
import { useEffect, useRef, useState } from "react";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* Custom cursor dot that lerps toward the pointer and expands over hoverables */
export function useCustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const scale = useRef(1);
  const targetScale = useRef(1);
  const hoverLabel = useRef("");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("ontouchstart" in window) === false && window.innerWidth < 1024) return;
    if (window.innerWidth < 1024) return;

    const cursor = cursorRef.current;
    const label = labelRef.current;
    if (!cursor) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const hoverable = el.closest("[data-cursor]");
      if (hoverable) {
        targetScale.current = Number(hoverable.getAttribute("data-cursor-scale") ?? 2.2);
        hoverLabel.current = hoverable.getAttribute("data-cursor-label") ?? "";
        if (label) label.textContent = hoverLabel.current;
      }
    };
    const onOut = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const hoverable = el.closest("[data-cursor]");
      if (hoverable) {
        targetScale.current = 1;
        hoverLabel.current = "";
        if (label) label.textContent = "";
      }
    };

    let raf = 0;
    const tick = () => {
      const ease = 0.18;
      pos.current.x += (target.current.x - pos.current.x) * ease;
      pos.current.y += (target.current.y - pos.current.y) * ease;
      scale.current += (targetScale.current - scale.current) * ease;
      cursor.style.transform = `translate(${pos.current.x - 10}px, ${pos.current.y - 10}px) scale(${scale.current})`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver, true);
    document.addEventListener("mouseout", onOut, true);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver, true);
      document.removeEventListener("mouseout", onOut, true);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { cursorRef, labelRef };
}

/* Reveal-on-scroll observer: adds .is-visible to .reveal elements when in view */
export function useRevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* Mouse parallax for an element: moves it subtly based on pointer position */
export function useMouseParallax(intensity = 18) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      target.x = ((e.clientX - cx) / cx) * intensity;
      target.y = ((e.clientY - cy) / cy) * intensity;
    };
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.08;
      cur.y += (target.y - cur.y) * 0.08;
      el.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [intensity]);
  return ref;
}

/* Magnetic button: pulls the button toward the cursor when hovered nearby */
export function useMagnetic<T extends HTMLElement = HTMLAnchorElement>(strength = 0.35) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let raf = 0;
    const cur = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      target.x = (e.clientX - cx) * strength;
      target.y = (e.clientY - cy) * strength;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };
    const tick = () => {
      cur.x += (target.x - cur.x) * 0.15;
      cur.y += (target.y - cur.y) * 0.15;
      el.style.transform = `translate3d(${cur.x}px, ${cur.y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    el.addEventListener("mousemove", onMove as EventListener);
    el.addEventListener("mouseleave", onLeave as EventListener);
    raf = requestAnimationFrame(tick);
    return () => {
      el.removeEventListener("mousemove", onMove as EventListener);
      el.removeEventListener("mouseleave", onLeave as EventListener);
      cancelAnimationFrame(raf);
    };
  }, [strength]);
  return ref;
}
