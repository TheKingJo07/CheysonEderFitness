import { useEffect, useRef } from "react";

/**
 * Custom cursor: a small golden dumbbell that follows the mouse.
 * Disabled on touch devices. Adds slight lag for premium feel.
 */
export default function DumbbellCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const visible = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (!visible.current && dotRef.current && ringRef.current) {
        dotRef.current.style.opacity = "1";
        ringRef.current.style.opacity = "1";
        visible.current = true;
      }
    };
    const onLeave = () => {
      if (dotRef.current && ringRef.current) {
        dotRef.current.style.opacity = "0";
        ringRef.current.style.opacity = "0";
      }
      visible.current = false;
    };
    const onDown = () => {
      ringRef.current?.classList.add("cursor-press");
    };
    const onUp = () => {
      ringRef.current?.classList.remove("cursor-press");
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    let raf = 0;
    const loop = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.22;
      pos.current.y += (target.current.y - pos.current.y) * 0.22;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Hover effects on interactive elements
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], input, textarea, select")) {
        ringRef.current?.classList.add("cursor-hover");
      } else {
        ringRef.current?.classList.remove("cursor-hover");
      }
    };
    window.addEventListener("mouseover", onOver);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <style>{`
        .ce-cursor-ring {
          position: fixed;
          top: 0; left: 0;
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1px solid oklch(0.82 0.16 85 / 0.55);
          background: radial-gradient(circle at center, oklch(0.82 0.16 85 / 0.12), transparent 70%);
          pointer-events: none;
          z-index: 9998;
          opacity: 0;
          transition: opacity 0.2s ease, width 0.25s ease, height 0.25s ease, border-color 0.25s ease;
          will-change: transform;
        }
        .ce-cursor-ring.cursor-hover {
          width: 64px; height: 64px;
          border-color: oklch(0.82 0.16 85 / 0.9);
        }
        .ce-cursor-ring.cursor-press {
          width: 32px; height: 32px;
        }
        .ce-cursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 28px; height: 28px;
          pointer-events: none;
          z-index: 9999;
          opacity: 0;
          transition: opacity 0.2s ease;
          will-change: transform;
          filter: drop-shadow(0 0 6px oklch(0.82 0.16 85 / 0.7));
        }
        @media (hover: none), (pointer: coarse) {
          .ce-cursor-ring, .ce-cursor-dot { display: none !important; }
        }
      `}</style>
      <div ref={ringRef} className="ce-cursor-ring" />
      <div ref={dotRef} className="ce-cursor-dot" aria-hidden="true">
        <svg viewBox="0 0 32 32" width="28" height="28">
          <defs>
            <linearGradient id="dbGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="oklch(0.92 0.14 90)" />
              <stop offset="100%" stopColor="oklch(0.72 0.18 75)" />
            </linearGradient>
          </defs>
          {/* Left weight */}
          <rect x="2" y="10" width="4" height="12" rx="1.2" fill="url(#dbGrad)" />
          <rect x="6" y="12" width="3" height="8" rx="1" fill="url(#dbGrad)" />
          {/* Bar */}
          <rect x="9" y="14.5" width="14" height="3" rx="1" fill="url(#dbGrad)" />
          {/* Right weight */}
          <rect x="23" y="12" width="3" height="8" rx="1" fill="url(#dbGrad)" />
          <rect x="26" y="10" width="4" height="12" rx="1.2" fill="url(#dbGrad)" />
        </svg>
      </div>
    </>
  );
}
