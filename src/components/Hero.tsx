"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import type { Profile } from "@/types/portfolio";

interface HeroProps {
  profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-8 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm"
      >
        <Sparkles className="h-3.5 w-3.5 text-accent-cyan" />
        <span className="text-xs tracking-widest text-white/60">THE WORKS OF</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-center font-display text-6xl font-bold tracking-tight md:text-8xl lg:text-9xl"
      >
        <span className="text-gradient">{profile.name}</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
        className="mt-6 max-w-2xl text-center text-lg text-white/50 md:text-xl"
      >
        {profile.tagline}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <a
          href="#works"
          className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-pink px-8 py-3 text-sm font-semibold text-surface transition-transform hover:scale-105"
        >
          <span className="relative z-10">浏览作品</span>
          <div className="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
        </a>
        <a
          href="#about"
          className="rounded-xl border border-white/15 px-8 py-3 text-sm font-medium text-white/70 transition-all hover:border-white/30 hover:text-white"
        >
          了解更多
        </a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-12"
      >
        <motion.a
          href="#about"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/30 transition-colors hover:text-white/60"
        >
          <span className="text-xs tracking-widest">SCROLL</span>
          <ArrowDown className="h-4 w-4" />
        </motion.a>
      </motion.div>
    </section>
  );
}
