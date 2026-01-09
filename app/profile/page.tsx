"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  MapPin,
  Trophy,
  Swords,
  Zap,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ChevronRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";

type Level = "Beginner" | "Intermediate" | "Advanced";
type Hand =
  | "Right-handed"
  | "Left-handed"
  | "Ambidextrous"
  | "Prefer not to say";

export default function ProfilePage() {
  // UI-only mock state (replace later with real data)
  const [displayName, setDisplayName] = useState("Nikita");
  const [city, setCity] = useState("Toronto");
  const [bio, setBio] = useState(
    "Prefer evenings after 6pm. Friendly matches + local ladders."
  );
  const [publicProfile, setPublicProfile] = useState(true);

  const setupProgress = 72;

  const motionIn = useMemo(
    () => ({
      initial: { y: 14, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.55, ease: "easeOut" as const },
    }),
    []
  );

  const cardHover = useMemo(
    () => ({
      whileHover: { y: -3 },
      transition: { type: "spring" as const, stiffness: 260, damping: 22 },
    }),
    []
  );

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background (like your login page vibe) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-28 -left-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-emerald-400/25 to-cyan-400/15 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-violet-400/20 to-fuchsia-400/12 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 h-[34rem] w-[34rem] rounded-full bg-gradient-to-br from-amber-300/16 to-rose-400/12 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:26px_26px] opacity-35" />
      </div>

      <div className="relative max-w-6xl mx-auto p-6 md:p-8 space-y-6">
        {/* Top bar */}
        <motion.div
          {...motionIn}
          className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="gap-2">
                <Zap className="h-3.5 w-3.5" />
                Toronto beta
              </Badge>
              <Badge variant="outline" className="gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                Profile setup
              </Badge>
              <Badge
                variant={publicProfile ? "secondary" : "outline"}
                className="gap-2"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                {publicProfile ? "Public" : "Private"}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Your player profile
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Make your Tennis + Ping Pong cards look great. This is what people
              see on venue pages and leaderboards.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/login">Sign out (mock)</Link>
            </Button>
            <Button asChild>
              <Link href="/explore">
                Next: Explore <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* LEFT: Player Identity + Setup */}
          <div className="lg:col-span-5 space-y-6">
            {/* Player ID card */}
            <motion.div {...motionIn} {...cardHover}>
              <Card className="relative overflow-hidden shadow-xl">
                {/* Decorative “court lines” */}
                <div className="pointer-events-none absolute inset-0 opacity-70">
                  <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full border border-foreground/10" />
                  <div className="absolute -top-16 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full border border-foreground/10" />
                  <div className="absolute top-28 left-10 right-10 h-px bg-foreground/10" />
                  <div className="absolute bottom-16 left-10 right-10 h-px bg-foreground/10" />
                </div>

                <CardHeader className="relative">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-xl">Player ID</CardTitle>
                      <CardDescription>
                        UI-only mock — no DB connected yet
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="gap-2">
                      <Trophy className="h-3.5 w-3.5" />
                      Ranked
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="relative space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="" alt={displayName} />
                        <AvatarFallback>
                          {displayName.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <button
                        className="absolute -bottom-2 -right-2 inline-flex h-8 w-8 items-center justify-center rounded-full border bg-background shadow-sm hover:bg-accent transition"
                        aria-label="Upload photo (mock)"
                      >
                        <Camera className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="min-w-0">
                      <div className="text-lg font-semibold leading-none truncate">
                        {displayName}
                      </div>
                      <div className="text-sm text-muted-foreground truncate">
                        @{displayName.toLowerCase()}
                      </div>
                      <div className="mt-2 inline-flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5" />
                        {city}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <MiniStat label="Matches" value="18" />
                    <MiniStat label="Wins" value="11" />
                    <MiniStat label="Venues" value="5" />
                    <MiniStat label="Streak" value="3W" />
                  </div>

                  <div className="rounded-2xl border bg-card/40 backdrop-blur p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium">Setup progress</div>
                      <Badge variant="secondary">{setupProgress}%</Badge>
                    </div>
                    <Progress value={setupProgress} />
                    <div className="grid gap-2">
                      <Step done label="Basic info" />
                      <Step done label="Tennis card" />
                      <Step label="Ping Pong card" />
                      <Step label="Pick 3 favorite venues" />
                    </div>
                    <Button className="w-full" asChild>
                      <a href="#cards">
                        Finish setup <ChevronRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick actions */}
            <motion.div
              {...motionIn}
              {...cardHover}
              transition={{ delay: 0.05, duration: 0.55, ease: "easeOut" }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-base">Quick actions</CardTitle>
                  <CardDescription>What you’ll do most often.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  <ActionRow
                    title="Check in at a venue"
                    desc="Go live on a court/table page."
                  />
                  <ActionRow
                    title="Report a match"
                    desc="Pending → confirm → ranked."
                  />
                  <ActionRow
                    title="Challenge player above"
                    desc="Climb the venue ladder."
                  />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* RIGHT: Editable profile form + player cards */}
          <div className="lg:col-span-7 space-y-6">
            {/* Editable basic info */}
            <motion.div
              {...motionIn}
              transition={{ delay: 0.03, duration: 0.55, ease: "easeOut" }}
            >
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle>Basic info</CardTitle>
                  <CardDescription>
                    Make it feel like a real athlete card.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Display name</Label>
                      <Input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>City</Label>
                      <Input
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="min-h-[110px]"
                    />
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border bg-card/40 backdrop-blur px-4 py-3">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">
                        Show profile publicly
                      </div>
                      <div className="text-xs text-muted-foreground">
                        When public, you appear in venue lists and leaderboards.
                      </div>
                    </div>
                    <Switch
                      checked={publicProfile}
                      onCheckedChange={setPublicProfile}
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Reset</Button>
                    <Button>Save changes</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Player cards */}
            <motion.div
              id="cards"
              {...motionIn}
              transition={{ delay: 0.06, duration: 0.55, ease: "easeOut" }}
            >
              <Card className="shadow-xl">
                <CardHeader>
                  <CardTitle>Player cards</CardTitle>
                  <CardDescription>
                    Tennis + Ping Pong. One account, two identities.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="tennis">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="tennis" className="gap-2">
                        <Trophy className="h-4 w-4" /> Tennis
                      </TabsTrigger>
                      <TabsTrigger value="ping" className="gap-2">
                        <Swords className="h-4 w-4" /> Ping Pong
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="tennis" className="mt-6">
                      <SportCard
                        badge="Venue ladder ready"
                        title="Tennis card"
                        subtitle="Keep it simple for MVP. Add NTRP later."
                        defaultLevel="Intermediate"
                        defaultHand="Right-handed"
                        defaultAvailability="Evenings + weekends"
                      />
                    </TabsContent>

                    <TabsContent value="ping" className="mt-6">
                      <SportCard
                        badge="Fast matches"
                        title="Ping Pong card"
                        subtitle="Quick games, quick ranks."
                        defaultLevel="Beginner"
                        defaultHand="Right-handed"
                        defaultAvailability="Weekends"
                      />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </motion.div>

            {/* Next step / CTA */}
            <motion.div
              {...motionIn}
              transition={{ delay: 0.1, duration: 0.55, ease: "easeOut" }}
            >
              <Card className="shadow-lg">
                <CardContent className="py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm">
                    ✅ Profile UI done → Next:{" "}
                    <span className="font-medium">Explore venues</span>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      We’ll wire Supabase after UI is solid.
                    </div>
                  </div>
                  <Button asChild>
                    <Link href="/explore">
                      Continue <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <Separator className="opacity-50" />

        <footer className="text-xs text-muted-foreground flex items-center justify-between">
          <span>UI prototype</span>
          <span>Next: Venue page + check-in</span>
        </footer>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-card/40 backdrop-blur px-4 py-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}

function Step({ done, label }: { done?: boolean; label: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border bg-background/40 px-3 py-2">
      <div className="text-sm">{label}</div>
      <Badge variant={done ? "secondary" : "outline"}>
        {done ? "Done" : "Todo"}
      </Badge>
    </div>
  );
}

function ActionRow({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex items-start justify-between gap-3 rounded-2xl border bg-card/40 backdrop-blur p-4 hover:bg-card/60 transition">
      <div className="space-y-1">
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground mt-0.5" />
    </div>
  );
}

function SportCard(props: {
  title: string;
  subtitle: string;
  badge: string;
  defaultLevel: Level;
  defaultHand: Hand;
  defaultAvailability: string;
}) {
  const [level, setLevel] = useState<Level>(props.defaultLevel);
  const [hand, setHand] = useState<Hand>(props.defaultHand);
  const [availability, setAvailability] = useState(props.defaultAvailability);
  const [vibe, setVibe] = useState([7]);
  const [notes, setNotes] = useState(
    "Open to friendly challenges. Prefer doubles sometimes."
  );

  return (
    <div className="grid gap-6 md:grid-cols-5">
      {/* Left: Card preview */}
      <motion.div
        className="md:col-span-2"
        whileHover={{ y: -3 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        <div className="rounded-3xl border bg-gradient-to-b from-card/80 to-card/40 backdrop-blur p-4 shadow-sm relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-gradient-to-br from-emerald-400/20 to-cyan-400/10 blur-2xl" />
            <div className="absolute -bottom-12 -left-10 h-28 w-28 rounded-full bg-gradient-to-br from-violet-400/16 to-fuchsia-400/10 blur-2xl" />
          </div>

          <div className="relative">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-sm font-semibold">{props.title}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {props.subtitle}
                </div>
              </div>
              <Badge variant="secondary" className="shrink-0">
                {props.badge}
              </Badge>
            </div>

            <Separator className="my-4 opacity-60" />

            <div className="space-y-2 text-sm">
              <Row label="Level" value={level} />
              <Row label="Hand" value={hand} />
              <Row label="Availability" value={availability} />
              <Row label="Competitive vibe" value={`${vibe[0]}/10`} />
            </div>

            <div className="mt-4 rounded-2xl border bg-background/40 px-3 py-2">
              <div className="text-xs text-muted-foreground">Notes</div>
              <div className="text-sm mt-1 line-clamp-2">{notes}</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right: Editor */}
      <div className="md:col-span-3 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label>Level</Label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as Level)}
              className="w-full h-10 rounded-md border bg-background px-3 text-sm"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>Handedness</Label>
            <select
              value={hand}
              onChange={(e) => setHand(e.target.value as Hand)}
              className="w-full h-10 rounded-md border bg-background px-3 text-sm"
            >
              <option>Right-handed</option>
              <option>Left-handed</option>
              <option>Ambidextrous</option>
              <option>Prefer not to say</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Availability</Label>
          <Input
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Competitive vibe</Label>
          <div className="rounded-2xl border bg-card/40 backdrop-blur p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Intensity</div>
              <Badge variant="secondary">{vibe[0]} / 10</Badge>
            </div>
            <Slider value={vibe} onValueChange={setVibe} max={10} step={1} />
            <div className="text-xs text-muted-foreground">
              1 = chill rallies • 10 = tournament mode
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Notes</Label>
          <Textarea
            className="min-h-[120px]"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. Prefer doubles, open to challenges, bring extra balls…"
          />
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Save card</Button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-sm font-medium">{value}</div>
    </div>
  );
}
