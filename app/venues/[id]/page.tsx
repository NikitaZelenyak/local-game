"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  ChevronRight,
  Crown,
  MapPin,
  Radar,
  Swords,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

// import AppHeader from "@/components/layout/app-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import AmbientBackground from "@/components/layout/ambient-background";

type Sport = "tennis" | "ping_pong";
type Status = "live" | "busy" | "quiet";

type Venue = {
  id: string;
  name: string;
  area: string;
  sport: Sport;
  status: Status;
  address: string;
  distanceKm: number;
  courtsOrTables: number;
  vibe: number; // 1-10
};

const MOCK_VENUES: Record<string, Venue> = {
  v1: {
    id: "v1",
    name: "Trinity Bellwoods Courts",
    area: "Queen West",
    sport: "tennis",
    status: "live",
    address: "Trinity Bellwoods Park, Toronto",
    distanceKm: 1.2,
    courtsOrTables: 4,
    vibe: 8,
  },
  v2: {
    id: "v2",
    name: "Harbourfront Tables",
    area: "Waterfront",
    sport: "ping_pong",
    status: "live",
    address: "Harbourfront, Toronto",
    distanceKm: 2.6,
    courtsOrTables: 2,
    vibe: 7,
  },
  v3: {
    id: "v3",
    name: "High Park Courts",
    area: "High Park",
    sport: "tennis",
    status: "busy",
    address: "High Park, Toronto",
    distanceKm: 5.1,
    courtsOrTables: 6,
    vibe: 9,
  },
};

const MOCK_LIVE_PLAYERS = [
  {
    name: "Alex",
    tag: "Looking for singles",
    level: "Intermediate",
    initials: "AL",
    minutes: 6,
  },
  {
    name: "Mila",
    tag: "Down for doubles",
    level: "Advanced",
    initials: "MI",
    minutes: 14,
  },
  {
    name: "Chris",
    tag: "Warmup rally",
    level: "Beginner",
    initials: "CH",
    minutes: 3,
  },
  {
    name: "Sam",
    tag: "Competitive",
    level: "Intermediate",
    initials: "SA",
    minutes: 22,
  },
];

const MOCK_LEADERBOARD = [
  { rank: 1, name: "Mila", elo: 1540, initials: "MI", streak: "4W" },
  { rank: 2, name: "Alex", elo: 1492, initials: "AL", streak: "2W" },
  { rank: 3, name: "Nikita", elo: 1458, initials: "NZ", streak: "3W" },
  { rank: 4, name: "Jordan", elo: 1420, initials: "JO", streak: "1W" },
  { rank: 5, name: "Kate", elo: 1398, initials: "KA", streak: "2L" },
];

const MOCK_MATCHES = [
  {
    id: "m1",
    title: "Nikita vs Alex",
    score: "6–4, 3–6, 10–8",
    when: "Today • 7:10 PM",
    tag: "Confirmed",
  },
  {
    id: "m2",
    title: "Mila vs Jordan",
    score: "6–2, 6–3",
    when: "Yesterday • 6:05 PM",
    tag: "Confirmed",
  },
  {
    id: "m3",
    title: "Sam vs Kate",
    score: "11–9, 7–11, 11–8",
    when: "Yesterday • 5:20 PM",
    tag: "Pending",
  },
];

export default function VenuePage({ params }: { params: { id: string } }) {
  const venue = MOCK_VENUES[params.id] ?? MOCK_VENUES["v1"];

  const [checkedIn, setCheckedIn] = useState(false);

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
      animate: { y: [0, -6, 0] },
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    }),
    []
  );

  const statusBadge =
    venue.status === "live"
      ? "Live now"
      : venue.status === "busy"
      ? "Busy"
      : "Quiet";

  const statusVariant =
    venue.status === "live"
      ? "secondary"
      : venue.status === "busy"
      ? "default"
      : "outline";

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* <AppHeader active="explore" showSearch={false} /> */}

      <AmbientBackground variant="soft" />

      <div className="max-w-6xl mx-auto p-6 md:p-8 space-y-6">
        {/* Breadcrumb + Title */}
        <motion.div
          {...motionIn}
          className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" asChild className="gap-2">
                <Link href="/explore">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Link>
              </Button>

              <Badge variant="outline" className="gap-2">
                <MapPin className="h-3.5 w-3.5" />
                {venue.area}
              </Badge>

              <Badge variant={statusVariant as any} className="gap-2">
                <Radar className="h-3.5 w-3.5" />
                {statusBadge}
              </Badge>

              <Badge variant="outline">
                {venue.sport === "tennis" ? "🎾 Tennis" : "🏓 Ping Pong"}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              {venue.name}
            </h1>

            <p className="text-sm text-muted-foreground max-w-2xl">
              {venue.address} • {venue.distanceKm} km away •{" "}
              {venue.sport === "tennis"
                ? `${venue.courtsOrTables} courts`
                : `${venue.courtsOrTables} tables`}
            </p>
          </div>

          <div className="flex gap-2">
            {!checkedIn ? (
              <Button onClick={() => setCheckedIn(true)} className="gap-2">
                <Zap className="h-4 w-4" />
                Check in
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => setCheckedIn(false)}
                className="gap-2"
              >
                <CalendarDays className="h-4 w-4" />
                Leave
              </Button>
            )}

            <Button variant="outline" className="gap-2">
              <Swords className="h-4 w-4" />
              Report match
            </Button>
          </div>
        </motion.div>

        {/* Hero card */}
        <motion.div
          {...motionIn}
          transition={{ delay: 0.05, duration: 0.55, ease: "easeOut" }}
        >
          <Card className="relative overflow-hidden shadow-2xl border-foreground/10">
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full border border-foreground/10" />
              <div className="absolute -top-16 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full border border-foreground/10" />
              <div className="absolute top-24 left-10 right-10 h-px bg-foreground/10" />
              <div className="absolute bottom-20 left-10 right-10 h-px bg-foreground/10" />
            </div>

            <motion.div
              {...float}
              className="absolute right-6 top-6 rounded-full border bg-card/80 px-3 py-1 text-xs font-semibold shadow-md"
            >
              {venue.sport === "tennis" ? "🎾 Rally ready" : "🏓 Rally ready"}
            </motion.div>

            <CardContent className="relative p-6 md:p-7 grid gap-4 md:grid-cols-12">
              <div className="md:col-span-7 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="gap-2">
                    <Users className="h-3.5 w-3.5" />
                    Live players:{" "}
                    {checkedIn
                      ? MOCK_LIVE_PLAYERS.length + 1
                      : MOCK_LIVE_PLAYERS.length}
                  </Badge>
                  <Badge variant="outline">Vibe {venue.vibe}/10</Badge>
                  {checkedIn && (
                    <Badge variant="secondary">You’re checked in</Badge>
                  )}
                </div>

                <div className="text-sm text-muted-foreground">
                  Tip: Check in to appear on this page. Then challenge someone
                  from the live list.
                </div>
              </div>

              <div className="md:col-span-5 space-y-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Today’s venue mission</span>
                  <span>60%</span>
                </div>
                <Progress value={60} />
                <div className="text-xs text-muted-foreground">
                  Confirm 1 match here to unlock your next ladder badge.
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: Live + Matches */}
          <motion.div
            {...motionIn}
            transition={{ delay: 0.08, duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-8 space-y-6"
          >
            <Tabs defaultValue="live">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="live" className="gap-2">
                  <Radar className="h-4 w-4" />
                  Live now
                </TabsTrigger>
                <TabsTrigger value="matches" className="gap-2">
                  <Swords className="h-4 w-4" />
                  Matches
                </TabsTrigger>
                <TabsTrigger value="about" className="gap-2">
                  <MapPin className="h-4 w-4" />
                  About
                </TabsTrigger>
              </TabsList>

              <TabsContent value="live" className="mt-6 space-y-4">
                <Card className="shadow-lg overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-base">Players on-site</CardTitle>
                    <CardDescription>
                      Tap to invite for a match (UI-only).
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {checkedIn && (
                      <div className="flex items-center justify-between rounded-2xl border bg-card/70 backdrop-blur p-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage src="" />
                            <AvatarFallback>NZ</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-semibold">You</div>
                            <div className="text-xs text-muted-foreground">
                              Checked in just now
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary">Live</Badge>
                      </div>
                    )}

                    {(MOCK_LIVE_PLAYERS ?? []).map((p) => (
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
                              {p.level} • {p.tag} • {p.minutes}m ago
                            </div>
                          </div>
                        </div>
                        <Button size="sm" className="gap-2">
                          Challenge <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="py-5 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Want more action? Invite someone and report a match to
                      climb the ladder.
                    </div>
                    <Button asChild>
                      <Link href="/explore">
                        Find another venue{" "}
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="matches" className="mt-6 space-y-4">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-base">Recent matches</CardTitle>
                    <CardDescription>
                      Confirmed matches affect the venue ladder.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {MOCK_MATCHES.map((m) => (
                      <div
                        key={m.id}
                        className="rounded-2xl border bg-card/70 backdrop-blur p-4 hover:bg-card/60 transition"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold">
                              {m.title}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {m.score}
                            </div>
                          </div>
                          <Badge
                            variant={
                              m.tag === "Confirmed" ? "secondary" : "outline"
                            }
                          >
                            {m.tag}
                          </Badge>
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-2">
                          {m.when}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="about" className="mt-6 space-y-4">
                <Card className="shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-base">Venue info</CardTitle>
                    <CardDescription>
                      Details you’ll store later (hours, lighting, etc.).
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm text-muted-foreground">
                    <div className="rounded-2xl border bg-card/70 backdrop-blur p-4">
                      <div className="font-medium text-foreground">Surface</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Mock: Hard court / Outdoor
                      </div>
                    </div>
                    <div className="rounded-2xl border bg-card/70 backdrop-blur p-4">
                      <div className="font-medium text-foreground">
                        Best time
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Mock: weekdays after 6pm, weekends morning
                      </div>
                    </div>
                    <div className="rounded-2xl border bg-card/70 backdrop-blur p-4">
                      <div className="font-medium text-foreground">Rules</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Mock: be respectful, confirm scores honestly.
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Right: Leaderboard */}
          <motion.div
            {...motionIn}
            transition={{ delay: 0.11, duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-4 space-y-6"
          >
            <Card className="shadow-xl overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <CardTitle className="text-base">Venue ladder</CardTitle>
                    <CardDescription>
                      Top players for this venue (mock).
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="gap-2">
                    <Trophy className="h-3.5 w-3.5" />
                    ELO
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                {MOCK_LEADERBOARD.map((p) => (
                  <div
                    key={p.rank}
                    className="flex items-center justify-between gap-3 rounded-2xl border bg-card/70 backdrop-blur p-3 hover:bg-card/60 transition"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 text-xs text-muted-foreground text-center">
                        {p.rank === 1 ? (
                          <Crown className="h-4 w-4 mx-auto" />
                        ) : (
                          `#${p.rank}`
                        )}
                      </div>
                      <Avatar className="h-9 w-9">
                        <AvatarImage src="" />
                        <AvatarFallback>{p.initials}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="text-sm font-semibold truncate">
                          {p.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">
                          {p.elo} ELO • {p.streak}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="gap-2">
                      Challenge <Swords className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Separator className="opacity-50" />

                <div className="rounded-2xl border bg-card/70 backdrop-blur p-4">
                  <div className="text-sm font-semibold">How it works</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Report match → both confirm → ladder updates. (Later:
                    anti-cheat + limits)
                  </div>
                </div>

                <Button className="w-full gap-2">
                  <Zap className="h-4 w-4" />
                  Check in & play
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="py-5 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Next: build the “Check-in modal” + “Create match” flow.
                </div>
                <Button variant="ghost" asChild className="gap-1">
                  <Link href="/explore">
                    Explore <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Separator className="opacity-50" />
        <footer className="text-xs text-muted-foreground flex items-center justify-between">
          <span>Venue UI prototype</span>
          <span>Next: Check-in modal + match create</span>
        </footer>
      </div>
    </div>
  );
}
