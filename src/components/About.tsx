"use client";

import { motion } from "framer-motion";
import { MapPin, Mail } from "lucide-react";
import type { Profile } from "@/types/portfolio";

interface AboutProps {
  profile: Profile;
}

export default function About({ profile }: AboutProps) {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="text-xs font-medium tracking-[0.3em] text-accent-cyan">01 — ABOUT</span>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            关于 <span className="text-gradient">我</span>
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="glass glow-cyan relative overflow-hidden rounded-3xl p-1">
              <div className="relative aspect-square overflow-hidden rounded-[22px] bg-surface-elevated">
                <img
                  src={profile.avatarUrl}
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-2 -right-2 rounded-xl bg-gradient-to-r from-accent-cyan to-accent-violet px-4 py-2 text-xs font-bold text-surface">
                {profile.title}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 text-sm text-white/50">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent-violet" />
                {profile.location}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent-pink" />
                {profile.email}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <p className="text-lg leading-relaxed text-white/70 md:text-xl">{profile.bio}</p>

            <div className="mt-10">
              <h3 className="mb-4 text-sm font-medium tracking-widest text-white/40">SKILLS</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, i) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="glass glass-hover rounded-lg px-3 py-1.5 text-sm text-white/70"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {Object.values(profile.social).some(Boolean) && (
              <div className="mt-10 flex flex-wrap gap-3">
                {profile.social.github && (
                  <SocialLink href={profile.social.github} label="GitHub" />
                )}
                {profile.social.twitter && (
                  <SocialLink href={profile.social.twitter} label="Twitter" />
                )}
                {profile.social.linkedin && (
                  <SocialLink href={profile.social.linkedin} label="LinkedIn" />
                )}
                {profile.social.website && (
                  <SocialLink href={profile.social.website} label="Website" />
                )}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="glass glass-hover rounded-lg px-4 py-2 text-sm text-white/60 transition-colors hover:text-accent-cyan"
    >
      {label} →
    </a>
  );
}
