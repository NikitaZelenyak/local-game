import { cn } from "@/lib/utils";

type AmbientBackgroundProps = {
  variant?: "default" | "soft" | "auth";
  className?: string;
};

const VARIANTS = {
  default: {
    grid: "opacity-35 [background-size:26px_26px]",
    glows: [
      "-top-28 -left-24 h-[28rem] w-[28rem] from-emerald-400/25 to-sky-400/15",
      "top-1/3 -right-24 h-[30rem] w-[30rem] from-amber-300/20 to-orange-400/12",
      "-bottom-36 left-1/3 h-[34rem] w-[34rem] from-cyan-300/20 to-lime-300/12",
    ],
  },
  soft: {
    grid: "opacity-25 [background-size:28px_28px]",
    glows: [
      "-top-24 -left-20 h-[24rem] w-[24rem] from-emerald-400/18 to-sky-400/12",
      "top-1/3 -right-20 h-[26rem] w-[26rem] from-amber-300/14 to-orange-400/10",
      "-bottom-28 left-1/3 h-[28rem] w-[28rem] from-cyan-300/14 to-lime-300/10",
    ],
  },
  auth: {
    grid: "opacity-40 [background-size:24px_24px]",
    glows: [
      "-top-28 -left-24 h-[30rem] w-[30rem] from-emerald-400/30 to-sky-400/18",
      "top-1/3 -right-24 h-[32rem] w-[32rem] from-amber-300/22 to-orange-400/16",
      "-bottom-32 left-1/3 h-[32rem] w-[32rem] from-cyan-300/22 to-lime-300/14",
    ],
  },
};

export default function AmbientBackground({
  variant = "default",
  className,
}: AmbientBackgroundProps) {
  const styles = VARIANTS[variant];

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 -z-10", className)}
    >
      {styles.glows.map((glow) => (
        <div
          key={glow}
          className={cn(
            "absolute rounded-full bg-gradient-to-br blur-3xl",
            glow
          )}
        />
      ))}
      <div
        className={cn(
          "absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)]",
          styles.grid
        )}
      />
    </div>
  );
}
