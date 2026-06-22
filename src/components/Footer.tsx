"use client";

import { motion } from "framer-motion";
import type { Profile } from "@/types/portfolio";

interface FooterProps {
  profile: Profile;
}

export default function Footer({ profile }: FooterProps) {
  return (
    <footer id="contact" className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass glow-cyan rounded-3xl p-10 text-center md:p-16"
        >
          <span className="text-xs font-medium tracking-[0.3em] text-accent-pink">03 — CONTACT</span>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
            一起创造下一个 <span className="text-gradient">Vibe</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/50">
            有想法、有合作、或只是想聊聊代码与创作？随时联系我。
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-8 inline-block rounded-xl bg-white px-8 py-3 text-sm font-semibold text-surface transition-transform hover:scale-105"
          >
            {profile.email}
          </a>
        </motion.div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-xs text-white/30 md:flex-row">
          <span>© {new Date().getFullYear()} {profile.name} · The Works of Louie Lu</span>
          <span>Built with Vibe Coding ✦</span>
        </div>
      </div>
    </footer>
  );
}
