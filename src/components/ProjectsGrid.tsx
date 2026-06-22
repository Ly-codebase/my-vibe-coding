"use client";

import { motion } from "framer-motion";
import type { Project } from "@/types/portfolio";
import ProjectCard from "./ProjectCard";

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="works" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col items-start justify-between gap-4 md:flex-row md:items-end"
        >
          <div>
            <span className="text-xs font-medium tracking-[0.3em] text-accent-violet">02 — WORKS</span>
            <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
              Vibe <span className="text-gradient">Coding</span> 作品
            </h2>
          </div>
          <p className="max-w-sm text-sm text-white/40">
            共 {projects.length} 个项目 · 在 /admin 可随时增删编辑
          </p>
        </motion.div>

        {featured.length > 0 && (
          <div className="mb-12">
            <h3 className="mb-6 text-xs font-medium tracking-widest text-white/30">FEATURED</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {featured.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          </div>
        )}

        {others.length > 0 && (
          <div>
            {featured.length > 0 && (
              <h3 className="mb-6 text-xs font-medium tracking-widest text-white/30">MORE</h3>
            )}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {others.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i + featured.length} />
              ))}
            </div>
          </div>
        )}

        {projects.length === 0 && (
          <div className="glass rounded-2xl py-20 text-center">
            <p className="text-white/40">暂无作品，前往管理面板添加你的第一个项目</p>
          </div>
        )}
      </div>
    </section>
  );
}
