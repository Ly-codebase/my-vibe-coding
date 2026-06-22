"use client";

import dynamic from "next/dynamic";

const BackgroundEffects = dynamic(() => import("./BackgroundEffects"), {
  ssr: false,
});

export default function BackgroundEffectsLoader() {
  return <BackgroundEffects />;
}
