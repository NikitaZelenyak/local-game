"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";

type AmbientBackgroundProps = {
  variant?: "default" | "soft" | "auth";
  className?: string;
};

const VARIANTS = {
  default: {
    grid: "opacity-35 [background-size:26px_26px]",
    glows: [
      {
        size: "h-[28rem] w-[28rem]",
        color: "from-emerald-400/25 to-sky-400/15",
      },
      {
        size: "h-[30rem] w-[30rem]",
        color: "from-amber-300/20 to-orange-400/12",
      },
      { size: "h-[34rem] w-[34rem]", color: "from-cyan-300/20 to-lime-300/12" },
    ],
  },
  soft: {
    grid: "opacity-25 [background-size:28px_28px]",
    glows: [
      {
        size: "h-[24rem] w-[24rem]",
        color: "from-emerald-400/18 to-sky-400/12",
      },
      {
        size: "h-[26rem] w-[26rem]",
        color: "from-amber-300/14 to-orange-400/10",
      },
      { size: "h-[28rem] w-[28rem]", color: "from-cyan-300/14 to-lime-300/10" },
    ],
  },
  auth: {
    grid: "opacity-40 [background-size:24px_24px]",
    glows: [
      {
        size: "h-[30rem] w-[30rem]",
        color: "from-emerald-400/30 to-sky-400/18",
      },
      {
        size: "h-[32rem] w-[32rem]",
        color: "from-amber-300/22 to-orange-400/16",
      },
      { size: "h-[32rem] w-[32rem]", color: "from-cyan-300/22 to-lime-300/14" },
    ],
  },
};

export default function AmbientBackground({
  variant = "default",
  className,
}: AmbientBackgroundProps) {
  const styles = VARIANTS[variant];
  const placements = useMemo(
    () =>
      styles.glows.map(() => ({
        top: `${Math.round(Math.random() * 80 - 20)}%`,
        left: `${Math.round(Math.random() * 80 - 20)}%`,
      })),
    [styles.glows]
  );

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
    >
      {styles.glows.map((glow, index) => (
        <div
          key={`${glow.color}-${index}`}
          className={cn(
            "absolute rounded-full bg-linear-to-br blur-3xl motion-safe:animate-[pulse_20s_ease-in-out_infinite]",
            glow.size,
            glow.color
          )}
          style={placements[index]}
        />
      ))}
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)]",
          styles.grid,
          "motion-safe:animate-[pulse_24s_ease-in-out_infinite]"
        )}
      />
    </div>
  );
}
