"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Compass,
  Filter,
  Layers,
  Map as MapIcon,
  MapPin,
  Navigation,
  Radar,
  Search,
  SlidersHorizontal,
  Sparkles,
  Trophy,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AmbientBackground from "@/components/layout/ambient-background";

type Sport = "tennis" | "ping_pong";
type Status = "live" | "busy" | "quiet";

type Venue = {
  id: string;
  name: string;
  area: string;
  sport: Sport;
  status: Status;
  players: number;
  vibe: number; // 1-10
  distanceKm: number;
  // fake map position (0..100)
  x: number;
  y: number;
};

const MOCK_VENUES: Venue[] = [
  {
    id: "v1",
    name: "Trinity Bellwoods Courts",
    area: "Queen West",
    sport: "tennis",
    status: "live",
    players: 7,
    vibe: 8,
    distanceKm: 1.2,
    x: 38,
    y: 55,
  },
  {
    id: "v2",
    name: "Harbourfront Tables",
    area: "Waterfront",
    sport: "ping_pong",
    status: "live",
    players: 4,
    vibe: 7,
    distanceKm: 2.6,
    x: 62,
    y: 72,
  },
  {
    id: "v3",
    name: "High Park Courts",
    area: "High Park",
    sport: "tennis",
    status: "busy",
    players: 10,
    vibe: 9,
    distanceKm: 5.1,
    x: 18,
    y: 38,
  },
  {
    id: "v4",
    name: "Riverdale East Courts",
    area: "Leslieville",
    sport: "tennis",
    status: "quiet",
    players: 1,
    vibe: 4,
    distanceKm: 3.8,
    x: 76,
    y: 44,
  },
  {
    id: "v5",
    name: "Christie Pits Courts",
    area: "Christie",
    sport: "tennis",
    status: "busy",
    players: 8,
    vibe: 8,
    distanceKm: 3.2,
    x: 44,
    y: 33,
  },
  {
    id: "v6",
    name: "Dufferin Grove Tables",
    area: "Dufferin",
    sport: "ping_pong",
    status: "quiet",
    players: 0,
    vibe: 3,
    distanceKm: 4.4,
    x: 29,
    y: 22,
  },
];

export default function ExplorePage() {
  const [view, setView] = useState<"map" | "list">("map");
  const [query, setQuery] = useState("");
  const [sport, setSport] = useState<Sport | "all">("all");
  const [liveOnly, setLiveOnly] = useState(false);
  const [maxKm, setMaxKm] = useState([6]);
  const [selectedId, setSelectedId] = useState<string>(MOCK_VENUES[0].id);

  const selected =
    MOCK_VENUES.find((v) => v.id === selectedId) ?? MOCK_VENUES[0];

  const filtered = MOCK_VENUES.filter((v) => {
    if (sport !== "all" && v.sport !== sport) return false;
    if (liveOnly && v.status !== "live") return false;
    if (v.distanceKm > maxKm[0]) return false;
    if (query.trim()) {
      const q = query.toLowerCase();
      if (
        !(v.name.toLowerCase().includes(q) || v.area.toLowerCase().includes(q))
      )
        return false;
    }
    return true;
  });

  const motionIn = useMemo(
    () => ({
      initial: { y: 14, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.55, ease: "easeOut" as const },
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
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="gap-2">
                <Zap className="h-3.5 w-3.5" />
                Toronto beta
              </Badge>
              <Badge variant="outline" className="gap-2">
                <Radar className="h-3.5 w-3.5" />
                Explore
              </Badge>
              <Badge variant="outline" className="gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                Map-first
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Explore venues
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Find live courts/tables near you. Map view is the default — it
              feels instantly “real-time”.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/home">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button asChild>
              <Link href="/profile">Profile</Link>
            </Button>
          </div>
        </motion.div>

        {/* Search + view switch */}
        <motion.div
          {...motionIn}
          transition={{ delay: 0.05, duration: 0.55, ease: "easeOut" }}
        >
          <Card className="shadow-xl overflow-hidden">
            <CardContent className="p-4 md:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    className="pl-9"
                    placeholder="Search venues or areas… (e.g. High Park, Waterfront)"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Tabs
                    value={view}
                    onValueChange={(v) => setView(v as any)}
                    className="w-auto"
                  >
                    <TabsList>
                      <TabsTrigger value="map" className="gap-2">
                        <MapIcon className="h-4 w-4" /> Map
                      </TabsTrigger>
                      <TabsTrigger value="list" className="gap-2">
                        <Layers className="h-4 w-4" /> List
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <Button variant="outline" className="gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Filters
                  </Button>
                </div>
              </div>

              <Separator className="my-4 opacity-60" />

              {/* Filters row */}
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-wrap gap-2">
                  <Chip
                    active={sport === "all"}
                    onClick={() => setSport("all")}
                  >
                    All
                  </Chip>
                  <Chip
                    active={sport === "tennis"}
                    onClick={() => setSport("tennis")}
                  >
                    🎾 Tennis
                  </Chip>
                  <Chip
                    active={sport === "ping_pong"}
                    onClick={() => setSport("ping_pong")}
                  >
                    🏓 Ping Pong
                  </Chip>
                </div>

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
                  <div className="flex items-center gap-3">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Live only</div>
                      <div className="text-xs text-muted-foreground">
                        Show venues with active players
                      </div>
                    </div>
                    <Switch checked={liveOnly} onCheckedChange={setLiveOnly} />
                  </div>

                  <div className="min-w-[220px]">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Max distance</span>
                      <span>{maxKm[0]} km</span>
                    </div>
                    <Slider
                      value={maxKm}
                      onValueChange={setMaxKm}
                      max={12}
                      step={1}
                    />
                  </div>

                  <Button variant="outline" className="gap-2">
                    <Compass className="h-4 w-4" />
                    Near me
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main content */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Map/List */}
          <motion.div
            {...motionIn}
            transition={{ delay: 0.08, duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-8"
          >
            <AnimatePresence mode="wait">
              {view === "map" ? (
                <motion.div
                  key="map"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <FakeMap
                    venues={filtered}
                    selectedId={selectedId}
                    onSelect={(id) => setSelectedId(id)}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-4"
                >
                  {filtered.map((v) => (
                    <motion.div
                      key={v.id}
                      whileHover={{ y: -3 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 22,
                      }}
                    >
                      <VenueRow
                        venue={v}
                        selected={v.id === selectedId}
                        onClick={() => setSelectedId(v.id)}
                      />
                    </motion.div>
                  ))}
                  {filtered.length === 0 && (
                    <Card className="shadow-lg">
                      <CardContent className="p-8 text-center text-sm text-muted-foreground">
                        No venues match your filters. Try increasing distance or
                        turning off “Live only”.
                      </CardContent>
                    </Card>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right details panel */}
          <motion.div
            {...motionIn}
            transition={{ delay: 0.11, duration: 0.55, ease: "easeOut" }}
            className="lg:col-span-4 space-y-6"
          >
            <Card className="shadow-xl overflow-hidden">
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <CardTitle className="text-base truncate">
                      {selected.name}
                    </CardTitle>
                    <CardDescription className="mt-1 inline-flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" /> {selected.area} •{" "}
                      {selected.distanceKm} km
                    </CardDescription>
                  </div>
                  <Badge
                    variant={
                      selected.status === "live"
                        ? "secondary"
                        : selected.status === "busy"
                        ? "default"
                        : "outline"
                    }
                  >
                    {selected.status === "live"
                      ? "Live now"
                      : selected.status === "busy"
                      ? "Busy"
                      : "Quiet"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <Mini
                    label="Sport"
                    value={selected.sport === "tennis" ? "Tennis" : "Ping Pong"}
                  />
                  <Mini label="Players" value={`${selected.players}`} />
                  <Mini label="Vibe" value={`${selected.vibe}/10`} />
                </div>

                <div className="rounded-2xl border bg-card/70 backdrop-blur p-4 space-y-2">
                  <div className="text-sm font-semibold">
                    What you can do here
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Check in → see who’s playing → report a match → confirm →
                    climb the venue ladder.
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 gap-2">
                    <Navigation className="h-4 w-4" />
                    Open venue
                  </Button>
                  <Button variant="outline" className="flex-1 gap-2">
                    <Trophy className="h-4 w-4" />
                    Ladder
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-base">Today’s missions</CardTitle>
                <CardDescription>UI-only “game loop” teaser.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Mission
                  title="Check in once"
                  desc="Appear on the venue live list"
                  progress={60}
                />
                <Mission
                  title="Confirm a match"
                  desc="Unlock your first rank"
                  progress={30}
                />
                <Mission
                  title="Challenge someone"
                  desc="Climb one spot"
                  progress={10}
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Separator className="opacity-50" />
        <footer className="text-xs text-muted-foreground flex items-center justify-between">
          <span>Explore UI prototype</span>
          <span>Next: Venue page (live check-ins)</span>
        </footer>
      </div>
    </div>
  );
}

function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm transition",
        active
          ? "bg-foreground text-background border-foreground"
          : "bg-card/70 backdrop-blur hover:bg-card/60",
      ].join(" ")}
    >
      {children}
    </button>
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

function Mission({
  title,
  desc,
  progress,
}: {
  title: string;
  desc: string;
  progress: number;
}) {
  return (
    <div className="rounded-2xl border bg-card/70 backdrop-blur p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">{title}</div>
          <div className="text-xs text-muted-foreground mt-1">{desc}</div>
        </div>
        <Badge variant="secondary" className="gap-2">
          <Sparkles className="h-3.5 w-3.5" />
          {progress}%
        </Badge>
      </div>

      <div className="mt-3 h-2 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-foreground"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function VenueRow({
  venue,
  selected,
  onClick,
}: {
  venue: Venue;
  selected?: boolean;
  onClick?: () => void;
}) {
  return (
    <Card
      className={[
        "shadow-lg overflow-hidden cursor-pointer",
        selected ? "ring-2 ring-foreground" : "",
      ].join(" ")}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <CardTitle className="text-base truncate">{venue.name}</CardTitle>
            <CardDescription className="mt-1 inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" /> {venue.area} •{" "}
              {venue.distanceKm} km
            </CardDescription>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Badge
              variant={
                venue.status === "live"
                  ? "secondary"
                  : venue.status === "busy"
                  ? "default"
                  : "outline"
              }
            >
              {venue.status === "live"
                ? "Live now"
                : venue.status === "busy"
                ? "Busy"
                : "Quiet"}
            </Badge>
            <Badge variant="outline">
              {venue.sport === "tennis" ? "Tennis" : "Ping Pong"}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-3 gap-3">
          <Mini label="Players" value={`${venue.players}`} />
          <Mini label="Vibe" value={`${venue.vibe}/10`} />
          <Mini
            label="Mode"
            value={venue.sport === "tennis" ? "Singles" : "Fast"}
          />
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Fake map (UI-only):
 * Later swap this component for Google Maps/Mapbox.
 */
function FakeMap({
  venues,
  selectedId,
  onSelect,
}: {
  venues: Venue[];
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <Card className="shadow-xl overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base">Map</CardTitle>
            <CardDescription>
              UI-only map canvas. Pins animate for “Live now”.
            </CardDescription>
          </div>
          <Badge variant="outline" className="gap-2">
            <MapIcon className="h-3.5 w-3.5" />
            {venues.length} venues
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="relative h-[420px] w-full rounded-2xl border bg-gradient-to-b from-card/80 to-card/40 backdrop-blur overflow-hidden">
          {/* decorative "roads" */}
          <div className="pointer-events-none absolute inset-0 opacity-70">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.10)_1px,transparent_0)] [background-size:22px_22px] opacity-35" />
            <div className="absolute left-[12%] top-[18%] h-px w-[76%] bg-foreground/10 rotate-[-8deg]" />
            <div className="absolute left-[20%] top-[48%] h-px w-[68%] bg-foreground/10 rotate-[10deg]" />
            <div className="absolute left-[24%] top-[70%] h-px w-[60%] bg-foreground/10 rotate-[-12deg]" />
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-400/18 to-cyan-400/10 blur-2xl" />
            <div className="absolute -left-16 -bottom-16 h-48 w-48 rounded-full bg-gradient-to-br from-violet-400/16 to-fuchsia-400/10 blur-2xl" />
          </div>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-6 top-6 rounded-full border bg-card/80 px-3 py-1 text-xs font-semibold shadow-md"
          >
            🎾 Live rallies
          </motion.div>
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: 0.7,
              ease: "easeInOut",
            }}
            className="absolute right-6 top-10 rounded-full border bg-card/80 px-3 py-1 text-xs font-semibold shadow-md"
          >
            🏓 Fast tables
          </motion.div>

          {/* pins */}
          {venues.map((v) => (
            <Pin
              key={v.id}
              venue={v}
              selected={v.id === selectedId}
              onClick={() => onSelect(v.id)}
            />
          ))}

          {/* map footer controls */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-2">
                <MapPin className="h-4 w-4" />
                Center
              </Button>
              <Button size="sm" variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Live only
              </Button>
            </div>
            <Badge variant="secondary" className="gap-2">
              <Zap className="h-3.5 w-3.5" />
              Map-first UX
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Pin({
  venue,
  selected,
  onClick,
}: {
  venue: Venue;
  selected: boolean;
  onClick: () => void;
}) {
  const isLive = venue.status === "live";

  return (
    <motion.button
      onClick={onClick}
      className={[
        "absolute -translate-x-1/2 -translate-y-1/2 rounded-full border bg-card/80 backdrop-blur px-2 py-1 shadow-sm",
        selected ? "ring-2 ring-foreground" : "hover:bg-card",
      ].join(" ")}
      style={{ left: `${venue.x}%`, top: `${venue.y}%` }}
      whileHover={{ y: -2, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <div className="relative flex items-center gap-2">
        {/* pulse for live */}
        {isLive && (
          <span className="absolute -left-1 -top-1 h-2 w-2">
            <span className="absolute inline-flex h-2 w-2 rounded-full bg-foreground opacity-75 animate-ping" />
            <span className="absolute inline-flex h-2 w-2 rounded-full bg-foreground" />
          </span>
        )}

        <MapPin className="h-4 w-4 text-muted-foreground" />
        <span className="text-xs font-semibold">
          {venue.sport === "tennis" ? "🎾" : "🏓"} {venue.players}
        </span>
      </div>
    </motion.button>
  );
}
