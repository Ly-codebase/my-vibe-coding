"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import type { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group glass glass-hover relative overflow-hidden rounded-2xl"
    >
      {project.featured && (
        <div className="absolute right-4 top-4 z-10 flex items-center gap-1 rounded-full bg-accent-cyan/10 px-2.5 py-1 text-xs font-medium text-accent-cyan backdrop-blur-sm">
          <Star className="h-3 w-3 fill-current" />
          Featured
        </div>
      )}

      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/20 to-transparent opacity-80" />
        <div className="absolute inset-0 bg-accent-violet/0 transition-colors duration-500 group-hover:bg-accent-violet/10" />
      </div>

      <div className="relative p-6">
        <div className="mb-2 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white/5 px-2 py-0.5 text-xs text-white/40"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="font-display text-xl font-bold text-white transition-colors group-hover:text-accent-cyan">
          {project.title}
        </h3>
        <p className="mt-1 text-sm text-accent-violet/80">{project.tagline}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-white/50">
          {project.description}
        </p>

        <div className="mt-5 flex items-center gap-3">
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-accent-cyan transition-opacity hover:opacity-80"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-medium text-white/40 transition-colors hover:text-white/70"
            >
              <Github className="h-3.5 w-3.5" />
              Source
            </a>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-accent-cyan/5 blur-3xl transition-all duration-500 group-hover:bg-accent-cyan/10" />
    </motion.article>
  );
}
