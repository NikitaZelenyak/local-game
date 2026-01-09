"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Compass,
  Map,
  MapPin,
  Radar,
  Sparkles,
  Swords,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AmbientBackground from "@/components/layout/ambient-background";
import ThemeToggle from "@/components/ui/theme-toggle";

export default function LandingPage() {
  const motionIn = useMemo(
    () => ({
      initial: { y: 14, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.55, ease: "easeOut" as const },
    }),
    []
  );

  const float = useMemo(
    () => ({
      animate: {
        y: [0, -6, 0],
      },
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    }),
    []
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      <AmbientBackground />

      {/* Header */}
      <header className="relative mx-auto max-w-6xl px-6 pt-6">
        <motion.div
          {...motionIn}
          className="flex items-center justify-between gap-3"
        >
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-2xl border bg-card/70 backdrop-blur flex items-center justify-center shadow-sm">
              <Zap className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Local Game</div>
              <div className="text-[11px] text-muted-foreground">
                Toronto beta
              </div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Button asChild variant="ghost" size="sm">
              <Link href="#how">How it works</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="#features">Features</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link href="#demo">Demo</Link>
            </Button>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild variant="outline">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">
                Get started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </header>

      <main className="relative mx-auto max-w-6xl px-6 pb-16">
        {/* Hero */}
        <section className="pt-12 md:pt-16">
          <motion.div
            {...motionIn}
            className="grid gap-8 lg:grid-cols-12 items-center"
          >
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="secondary" className="gap-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  Map-first sports community
                </Badge>
                <Badge variant="outline" className="gap-2">
                  <Radar className="h-3.5 w-3.5" />
                  Live check-ins
                </Badge>
                <Badge variant="outline" className="gap-2">
                  <Trophy className="h-3.5 w-3.5" />
                  Venue ladders
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
                <span className="bg-gradient-to-r from-emerald-600 to-sky-500 bg-clip-text text-transparent dark:from-emerald-300 dark:to-sky-300">
                  Find players near you.
                </span>
                <span className="block text-muted-foreground">
                  Check in. Play. Confirm. Climb.
                </span>
              </h1>

              <p className="text-sm md:text-base text-muted-foreground max-w-xl">
                Local Game is a location-based app for Tennis and Ping Pong in
                Toronto. See who’s playing right now, meet up at a venue, and
                build your rank with confirmed matches.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg">
                  <Link href="/signup">
                    Create account <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/explore">Explore demo</Link>
                </Button>
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4" />
                  Confirmed results
                </span>
                <span className="inline-flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Community first
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Toronto beta
                </span>
              </div>
            </div>

            {/* Hero mock map card */}
            <motion.div
              className="lg:col-span-6"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.55, ease: "easeOut" }}
              whileHover={{ y: -3 }}
            >
              <Card className="shadow-2xl overflow-hidden border-foreground/10">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <CardTitle className="text-base">
                        Live map (demo)
                      </CardTitle>
                      <CardDescription>
                        UI-only preview — real map later.
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="gap-2">
                      <Zap className="h-3.5 w-3.5" />
                      Live
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="relative h-[320px] w-full rounded-2xl border bg-gradient-to-b from-card/80 to-card/40 backdrop-blur overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 opacity-70">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.10)_1px,transparent_0)] [background-size:22px_22px] opacity-35" />
                      <div className="absolute left-[12%] top-[18%] h-px w-[76%] bg-foreground/10 rotate-[-8deg]" />
                      <div className="absolute left-[20%] top-[48%] h-px w-[68%] bg-foreground/10 rotate-[10deg]" />
                      <div className="absolute left-[24%] top-[70%] h-px w-[60%] bg-foreground/10 rotate-[-12deg]" />
                    </div>

                    <motion.div
                      {...float}
                      className="absolute left-6 top-5 rounded-full border bg-card/80 px-3 py-1 text-xs font-semibold shadow-md"
                    >
                      🎾 Tennis
                    </motion.div>
                    <motion.div
                      {...float}
                      transition={{ ...float.transition, delay: 0.6 }}
                      className="absolute right-6 top-10 rounded-full border bg-card/80 px-3 py-1 text-xs font-semibold shadow-md"
                    >
                      🏓 Ping Pong
                    </motion.div>
                    <motion.div
                      {...float}
                      transition={{ ...float.transition, delay: 1.1 }}
                      className="absolute left-10 bottom-10 rounded-full border bg-card/80 px-3 py-1 text-xs font-semibold shadow-md"
                    >
                      🥇 Ladder
                    </motion.div>

                    <MapPinDemo x={32} y={62} label="🎾 7" live />
                    <MapPinDemo x={58} y={72} label="🏓 4" live />
                    <MapPinDemo x={18} y={40} label="🎾 10" />
                    <MapPinDemo x={76} y={48} label="🎾 1" />

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <Badge variant="outline" className="gap-2">
                        <Map className="h-3.5 w-3.5" />
                        Toronto
                      </Badge>
                      <Badge variant="secondary" className="gap-2">
                        <Radar className="h-3.5 w-3.5" />4 venues active
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* How it works */}
        <section id="how" className="pt-14 md:pt-18">
          <motion.div
            {...motionIn}
            transition={{ delay: 0.06, duration: 0.55, ease: "easeOut" }}
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  How it works
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  A simple loop that creates real community.
                </p>
              </div>
              <Badge variant="outline" className="gap-2">
                <Compass className="h-3.5 w-3.5" />
                Map-first
              </Badge>
            </div>

            <div className="grid gap-4 mt-6 md:grid-cols-4">
              <StepCard
                title="1) Explore"
                desc="Find a nearby venue on the map."
                icon={<Map className="h-4 w-4" />}
              />
              <StepCard
                title="2) Check in"
                desc="Show you’re ready to play right now."
                icon={<Radar className="h-4 w-4" />}
              />
              <StepCard
                title="3) Play & report"
                desc="Create a match and enter the score."
                icon={<Swords className="h-4 w-4" />}
              />
              <StepCard
                title="4) Confirm"
                desc="Both players confirm → ladder updates."
                icon={<Trophy className="h-4 w-4" />}
              />
            </div>
          </motion.div>
        </section>

        {/* Features */}
        <section id="features" className="pt-14 md:pt-18">
          <motion.div
            {...motionIn}
            transition={{ delay: 0.08, duration: 0.55, ease: "easeOut" }}
          >
            <div className="flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  Features
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Built for real play — not endless scrolling.
                </p>
              </div>
            </div>

            <div className="grid gap-4 mt-6 md:grid-cols-3">
              <FeatureCard
                title="Venue ladders"
                desc="Rank per venue so it stays local and fair."
              />
              <FeatureCard
                title="Live check-ins"
                desc="See who’s actually there right now."
              />
              <FeatureCard
                title="Trusted results"
                desc="Matches only count after confirmation."
              />
              <FeatureCard
                title="Multiple sports"
                desc="One account, separate Tennis/Ping Pong cards."
              />
              <FeatureCard
                title="Challenges"
                desc="Challenge someone above you to climb."
              />
              <FeatureCard
                title="Tournaments (later)"
                desc="Run brackets once the community is strong."
              />
            </div>
          </motion.div>
        </section>

        {/* Demo CTA */}
        <section id="demo" className="pt-14 md:pt-18">
          <motion.div
            {...motionIn}
            transition={{ delay: 0.1, duration: 0.55, ease: "easeOut" }}
          >
            <Card className="shadow-xl overflow-hidden">
              <CardContent className="p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="gap-2">
                      <Zap className="h-3.5 w-3.5" />
                      Ready to play?
                    </Badge>
                    <Badge variant="outline">Tennis + Ping Pong</Badge>
                  </div>
                  <div className="text-xl font-semibold">
                    Open the demo and explore Toronto venues
                  </div>
                  <div className="text-sm text-muted-foreground">
                    You can explore right now. Create an account when you’re
                    ready.
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button asChild size="lg" variant="outline">
                    <Link href="/explore">Explore demo</Link>
                  </Button>
                  <Button asChild size="lg">
                    <Link href="/signup">
                      Get started <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        <Separator className="my-14 opacity-50" />

        {/* Footer */}
        <footer className="pb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span>Local Game • Toronto beta</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hover:text-foreground transition">
              Log in
            </Link>
            <Link href="/signup" className="hover:text-foreground transition">
              Sign up
            </Link>
            <Link href="/explore" className="hover:text-foreground transition">
              Demo
            </Link>
          </div>
        </footer>
      </main>
    </div>
  );
}

function MapPinDemo({
  x,
  y,
  label,
  live,
}: {
  x: number;
  y: number;
  label: string;
  live?: boolean;
}) {
  return (
    <button
      className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border bg-card/80 backdrop-blur px-2 py-1 shadow-md hover:bg-card transition"
      style={{ left: `${x}%`, top: `${y}%` }}
      aria-label="Map pin"
    >
      <div className="relative flex items-center gap-2">
        {live && (
          <span className="absolute -left-1 -top-1 h-2 w-2">
            <span className="absolute inline-flex h-2 w-2 rounded-full bg-foreground opacity-75 animate-ping" />
            <span className="absolute inline-flex h-2 w-2 rounded-full bg-foreground" />
          </span>
        )}
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-semibold">{label}</span>
      </div>
    </button>
  );
}

function StepCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="shadow-lg">
      <CardContent className="p-5">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border bg-card/70 backdrop-blur shadow-sm">
          <span className="text-muted-foreground">{icon}</span>
        </div>
        <div className="mt-3 text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground mt-1">{desc}</div>
      </CardContent>
    </Card>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <Card className="shadow-lg overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="rounded-2xl border bg-card/70 backdrop-blur p-4 text-xs text-muted-foreground">
          UI-only — later this will show real data and real venues.
        </div>
      </CardContent>
    </Card>
  );
}
