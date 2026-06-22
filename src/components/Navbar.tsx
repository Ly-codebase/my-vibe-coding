"use client";

import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 right-0 top-0 z-50 px-6 py-4"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-surface/60 px-6 py-3 backdrop-blur-xl">
        <Link href="/" className="group flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-accent-cyan shadow-[0_0_12px_#00f5ff]" />
          <span className="font-display text-sm font-semibold tracking-wider text-white/90 transition-colors group-hover:text-accent-cyan">
            LOUIE LU
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#about" className="text-sm text-white/60 transition-colors hover:text-white">
            关于
          </a>
          <a href="#works" className="text-sm text-white/60 transition-colors hover:text-white">
            作品
          </a>
          <a href="#contact" className="text-sm text-white/60 transition-colors hover:text-white">
            联系
          </a>
        </div>

        <Link
          href="/admin"
          className="flex items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs text-white/50 transition-all hover:border-accent-violet/40 hover:text-accent-violet"
        >
          <Settings className="h-3.5 w-3.5" />
          管理
        </Link>
      </nav>
    </motion.header>
  );
}
