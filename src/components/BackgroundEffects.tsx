"use client";

import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Rich dark base */}
      <div className="absolute inset-0 bg-prism-base" />

      {/* Slow color-shifting ambient mesh */}
      <div className="absolute inset-0 bg-prism-mesh" />

      {/* Rotating conic prism — sharp, no blur */}
      <div className="absolute left-1/2 top-[-20vh] h-[90vh] w-[90vh] -translate-x-1/2">
        <motion.div
          className="bg-prism-conic h-full w-full rounded-full opacity-[0.55]"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <div className="absolute inset-[18%] rounded-full bg-prism-base" />
      </div>

      {/* Diagonal light beams — crisp edges */}
      <div className="beam beam-1 absolute inset-0" />
      <div className="beam beam-2 absolute inset-0" />
      <div className="beam beam-3 absolute inset-0" />

      {/* Edge accent lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent" />

      {/* Corner glow accents — localized, not full-page blur */}
      <div className="glow-corner glow-tl absolute left-0 top-0 h-64 w-64" />
      <div className="glow-corner glow-br absolute bottom-0 right-0 h-64 w-64" />

      {/* Bottom fade for depth */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#050508] to-transparent" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(5,5,12,0.55)_100%)]" />
    </div>
  );
}
