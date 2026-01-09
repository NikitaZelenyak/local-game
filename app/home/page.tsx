"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  MapPin,
  Radar,
  Sparkles,
  Swords,
  Trophy,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import AmbientBackground from "@/components/layout/ambient-background";

type Sport = "Tennis" | "Ping Pong";

const MOCK_USER = {
  name: "Nikita",
  city: "Toronto",
  avatarUrl: "",
  setup: 78,
};

const MOCK_VENUES: Array<{
  id: string;
  name: string;
  area: string;
  sport: Sport;
  status: "Live now" | "Busy" | "Quiet";
  players: number;
  vibe: number; // 1-10
  distance: string;
}> = [
  {
    id: "v1",
    name: "Trinity Bellwoods Courts",
    area: "Queen West",
    sport: "Tennis",
    status: "Live now",
    players: 7,
    vibe: 8,
    distance: "1.2 km",
  },
  {
    id: "v2",
    name: "Harbourfront Tables",
    area: "Waterfront",
    sport: "Ping Pong",
    status: "Live now",
    players: 4,
    vibe: 7,
    distance: "2.6 km",
  },
  {
    id: "v3",
    name: "High Park Courts",
    area: "High Park",
    sport: "Tennis",
    status: "Busy",
    players: 10,
    vibe: 9,
    distance: "5.1 km",
  },
  {
    id: "v4",
    name: "Riverdale East Courts",
    area: "Leslieville",
    sport: "Tennis",
    status: "Quiet",
    players: 1,
    vibe: 4,
    distance: "3.8 km",
  },
];

const MOCK_ACTIVITY = [
  {
    id: "a1",
    title: "Match confirmed",
    desc: "Nikita vs Alex • 6–4, 3–6, 10–8",
    meta: "Trinity Bellwoods • Tennis",
    badge: "Ranked",
  },
  {
    id: "a2",
    title: "New check-in",
    desc: "Mila checked in • looking for doubles",
    meta: "High Park • Tennis",
    badge: "Live",
  },
  {
    id: "a3",
    title: "Challenge",
    desc: "You challenged #3 on the ladder",
    meta: "Riverdale East • Tennis",
    badge: "Ladder",
  },
];

const MOCK_PLAYERS = [
  {
    name: "Alex",
    tag: "Aggressive baseliner",
    sport: "Tennis",
    rank: "#2",
    initials: "AL",
  },
  {
    name: "Mila",
    tag: "Doubles specialist",
    sport: "Tennis",
    rank: "#5",
    initials: "MI",
  },
  {
    name: "Chris",
    tag: "Spin + control",
    sport: "Ping Pong",
    rank: "#1",
    initials: "CH",
  },
];

export default function HomePage() {
  const motionIn = useMemo(
    () => ({
      initial: { y: 14, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.55, ease: "easeOut" as const },
    }),
    []
  );

  const stagger = useMemo(
    () => ({
      initial: {},
      animate: { transition: { staggerChildren: 0.06 } },
    }),
    []
  );

  const badgeIn = useMemo(
    () => ({
      initial: { y: 8, opacity: 0 },
      animate: { y: 0, opacity: 1 },
    }),
    []
  );

  const float = useMemo(
    () => ({
      animate: { y: [0, -6, 0] },
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

      <div className="relative max-w-6xl mx-auto p-6 md:p-8 space-y-6">
        {/* Top */}
        <motion.div
          {...motionIn}
          className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
        >
          <div className="space-y-2">
            <motion.div
              variants={stagger}
              initial="initial"
              animate="animate"
              className="flex items-center gap-2 flex-wrap"
            >
              <motion.div variants={badgeIn}>
                <Badge variant="secondary" className="gap-2">
                  <Zap className="h-3.5 w-3.5" />
                  Toronto beta
                </Badge>
              </motion.div>
              <motion.div variants={badgeIn}>
                <Badge variant="outline" className="gap-2">
                  <Radar className="h-3.5 w-3.5" />
                  Live venues
                </Badge>
              </motion.div>
              <motion.div variants={badgeIn}>
                <Badge variant="outline" className="gap-2">
                  <Sparkles className="h-3.5 w-3.5" />
                  UI-only
                </Badge>
              </motion.div>
            </motion.div>

            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-emerald-600 to-sky-500 bg-clip-text text-transparent dark:from-emerald-300 dark:to-sky-300">
                Hey, {MOCK_USER.name} 👋
              </span>
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Check in, find a match, confirm the score — and climb your local
              ladder.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/profile">Profile</Link>
            </Button>
            <Button asChild>
              <Link href="/explore">
                Explore <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Hero strip */}
        <motion.div
          {...motionIn}
          transition={{ delay: 0.05, duration: 0.55, ease: "easeOut" }}
        >
          <Card className="relative overflow-hidden shadow-2xl border-foreground/10">
            {/* court lines + subtle glow */}
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full border border-foreground/10" />
              <div className="absolute -top-16 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full border border-foreground/10" />
              <div className="absolute top-24 left-10 right-10 h-px bg-foreground/10" />
              <div className="absolute bottom-20 left-10 right-10 h-px bg-foreground/10" />
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-linear-to-br from-emerald-400/20 to-cyan-400/10 blur-2xl" />
              <div className="absolute -left-16 -bottom-16 h-40 w-40 rounded-full bg-linear-to-br from-violet-400/16 to-fuchsia-400/10 blur-2xl" />
            </div>

            <motion.div
              {...float}
              className="absolute right-6 top-6 rounded-full border bg-card/80 px-3 py-1 text-xs font-semibold shadow-md"
            >
              🎾 Tennis pulse
            </motion.div>
            <motion.div
              {...float}
              transition={{ ...float.transition, delay: 0.7 }}
              className="absolute right-6 top-14 rounded-full border bg-card/80 px-3 py-1 text-xs font-semibold shadow-md"
            >
              🏓 Ping pong pulse
            </motion.div>

            <CardContent className="relative p-6 md:p-7">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={MOCK_USER.avatarUrl}
                      alt={MOCK_USER.name}
                    />
                    <AvatarFallback>
                      {MOCK_USER.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{MOCK_USER.name}</div>
                    <div className="text-xs text-muted-foreground inline-flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />
                      {MOCK_USER.city} • Setup {MOCK_USER.setup}%
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <HeroPill
                    icon={<Trophy className="h-4 w-4" />}
                    title="Ladder"
                    desc="Venue ranks"
                  />
                  <HeroPill
                    icon={<Swords className="h-4 w-4" />}
                    title="Matches"
                    desc="Confirm scores"
                  />
                  <HeroPill
                    icon={<CalendarDays className="h-4 w-4" />}
                    title="Sessions"
                    desc="Check-ins"
                  />
                  <HeroPill
                    icon={<BadgeCheck className="h-4 w-4" />}
                    title="Trusted"
                    desc="Anti-cheat"
                  />
                </div>
              </div>

              <div className="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Setup progress</span>
                    <span>{MOCK_USER.setup}%</span>
                  </div>
                  <Progress value={MOCK_USER.setup} />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <Link href="/explore">Check in</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/explore">
                      Find a match <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: Live venues */}
          <motion.div
            {...stagger}
            initial="initial"
            animate="animate"
            className="lg:col-span-8 space-y-6"
          >
            <motion.div
              {...motionIn}
              className="flex items-end justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold">Live near you</h2>
                <p className="text-sm text-muted-foreground">
                  Jump into a court/table that’s active right now.
                </p>
              </div>
              <Button variant="ghost" asChild className="gap-1">
                <Link href="/explore">
                  View all <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-2">
              {MOCK_VENUES.map((v, idx) => (
                <motion.div
                  key={v.id}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.05 + idx * 0.05,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -3 }}
                >
                  <VenueCard venue={v} />
                </motion.div>
              ))}
            </div>

            {/* CTA strip */}
            <motion.div
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.22, duration: 0.55, ease: "easeOut" }}
              whileHover={{ y: -2 }}
            >
              <Card className="shadow-lg">
                <CardContent className="py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm">
                    🔥 Today’s goal:{" "}
                    <span className="font-medium">confirm 1 match</span> to
                    unlock your first ladder rank.
                    <div className="text-xs text-muted-foreground mt-0.5">
                      (UI-only) Later this becomes a real achievement system.
                    </div>
                  </div>
                  <Button asChild>
                    <Link href="/explore">
                      Report match <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Right: Activity + players */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div
              {...motionIn}
              transition={{ delay: 0.08, duration: 0.55, ease: "easeOut" }}
            >
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-base">Activity</CardTitle>
                  <CardDescription>Recent local events (mock).</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {MOCK_ACTIVITY.map((a) => (
                    <div
                      key={a.id}
                      className="rounded-2xl border bg-card/70 backdrop-blur p-4 hover:bg-card/60 transition"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="text-sm font-semibold">{a.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {a.desc}
                          </div>
                        </div>
                        <Badge variant="secondary" className="shrink-0">
                          {a.badge}
                        </Badge>
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-2">
                        {a.meta}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              {...motionIn}
              transition={{ delay: 0.11, duration: 0.55, ease: "easeOut" }}
            >
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle className="text-base">Trending players</CardTitle>
                  <CardDescription>
                    Who’s climbing ladders this week.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {MOCK_PLAYERS.map((p) => (
                    <div
                      key={p.name}
                      className="flex items-center justify-between gap-3 rounded-2xl border bg-card/70 backdrop-blur p-3 hover:bg-card/60 transition"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="" />
                          <AvatarFallback>{p.initials}</AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="text-sm font-semibold truncate">
                            {p.name}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">
                            {p.tag} • {p.sport}
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="shrink-0">
                        {p.rank}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              {...motionIn}
              transition={{ delay: 0.14, duration: 0.55, ease: "easeOut" }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-base">Next</CardTitle>
                  <CardDescription>
                    Build the Venue page (live check-ins).
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Venue page → Check-in → Match → Confirm
                  </div>
                  <Button variant="ghost" asChild className="gap-1">
                    <Link href="/explore">
                      Go <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <Separator className="opacity-50" />
        <footer className="text-xs text-muted-foreground flex items-center justify-between">
          <span>Home UI prototype</span>
          <span>Next: Explore + Venue page</span>
        </footer>
      </div>
    </div>
  );
}

function HeroPill({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border bg-card/70 backdrop-blur px-3 py-2 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="text-muted-foreground">{icon}</div>
        <div className="text-sm font-semibold">{title}</div>
      </div>
      <div className="text-[11px] text-muted-foreground mt-1">{desc}</div>
    </div>
  );
}

function VenueCard({ venue }: { venue: (typeof MOCK_VENUES)[number] }) {
  const statusVariant =
    venue.status === "Live now"
      ? "secondary"
      : venue.status === "Busy"
      ? "default"
      : "outline";

  return (
    <Card className="relative overflow-hidden shadow-lg">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-linear-to-br from-emerald-400/18 to-cyan-400/10 blur-2xl" />
        <div className="absolute -left-12 -bottom-12 h-28 w-28 rounded-full bg-linear-to-br from-violet-400/14 to-fuchsia-400/10 blur-2xl" />
      </div>

      <CardHeader className="relative">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="text-base truncate">{venue.name}</CardTitle>
            <CardDescription className="mt-1 inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" /> {venue.area} • {venue.distance}
            </CardDescription>
          </div>

          <div className="flex flex-col items-end gap-2 shrink-0">
            <Badge variant={statusVariant as any}>{venue.status}</Badge>
            <Badge variant="outline">{venue.sport}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <Mini label="Players" value={`${venue.players}`} />
          <Mini label="Vibe" value={`${venue.vibe}/10`} />
          <Mini
            label="Mode"
            value={venue.sport === "Tennis" ? "Singles" : "Fast"}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Tap to open venue page (later)
          </div>
          <Button size="sm" asChild>
            <Link href="/explore">
              Open <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-card/70 backdrop-blur px-3 py-2">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="text-sm font-semibold">{value}</div>
    </div>
  );
}
