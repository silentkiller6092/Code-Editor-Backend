"use client";
import { TextGenerateEffect } from "../components/ui/TextGenerator";

const words = `Code in real-time with our online platform. Write, edit, and debug seamlessly—all within your browser. Simplify your development journey and focus on what matters: building great software.`;

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} />;
}
