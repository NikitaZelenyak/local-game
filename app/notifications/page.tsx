"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  BellRing,
  BadgeCheck,
  CalendarDays,
  ChevronRight,
  Filter,
  MapPin,
  MessageSquare,
  Radar,
  ShieldAlert,
  Sparkles,
  Swords,
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";

type NotifType =
  | "match_confirm"
  | "challenge"
  | "checkin"
  | "system"
  | "message";
type Notif = {
  id: string;
  type: NotifType;
  title: string;
  body: string;
  meta: string;
  venue?: { id: string; name: string; area: string };
  time: string;
  unread?: boolean;
  cta?: { label: string; href: string; variant?: "default" | "outline" };
};

const MOCK_NOTIFS: Notif[] = [
  {
    id: "n1",
    type: "match_confirm",
    title: "Confirm match result",
    body: "Alex reported: Nikita vs Alex • 6–4, 3–6, 10–8",
    meta: "Pending your confirmation",
    venue: { id: "v1", name: "Trinity Bellwoods Courts", area: "Queen West" },
    time: "2m ago",
    unread: true,
    cta: { label: "Review & confirm", href: "/matches/m1", variant: "default" },
  },
  {
    id: "n2",
    type: "challenge",
    title: "You got challenged",
    body: "Mila challenged you for a ladder match (#5 → #4).",
    meta: "Venue ladder",
    venue: { id: "v3", name: "High Park Courts", area: "High Park" },
    time: "18m ago",
    unread: true,
    cta: { label: "Open venue", href: "/venues/v3", variant: "outline" },
  },
  {
    id: "n3",
    type: "checkin",
    title: "Live now near you",
    body: "4 players checked in — looks like a good time to play.",
    meta: "Live activity",
    venue: { id: "v2", name: "Harbourfront Tables", area: "Waterfront" },
    time: "1h ago",
    cta: { label: "Check in", href: "/venues/v2", variant: "default" },
  },
  {
    id: "n4",
    type: "message",
    title: "New message (mock)",
    body: "Chris: “Down for ping pong doubles?”",
    meta: "Direct message (later)",
    venue: { id: "v2", name: "Harbourfront Tables", area: "Waterfront" },
    time: "3h ago",
    cta: { label: "Reply", href: "/venues/v2", variant: "outline" },
  },
  {
    id: "n5",
    type: "system",
    title: "Fair play reminder",
    body: "Only confirmed matches affect ladder rankings. Keep it honest.",
    meta: "System",
    time: "Yesterday",
    cta: { label: "Learn more", href: "/profile", variant: "outline" },
  },
];

export default function NotificationsPage() {
  const [onlyUnread, setOnlyUnread] = useState(false);

  const unreadCount = MOCK_NOTIFS.filter((n) => n.unread).length;

  const motionIn = useMemo(
    () => ({
      initial: { y: 14, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.55, ease: "easeOut" as const },
    }),
    []
  );

  const filtered = (kind: "all" | "requests" | "activity") => {
    let list = [...MOCK_NOTIFS];

    if (onlyUnread) list = list.filter((n) => n.unread);

    if (kind === "requests") {
      list = list.filter(
        (n) => n.type === "match_confirm" || n.type === "challenge"
      );
    }
    if (kind === "activity") {
      list = list.filter(
        (n) =>
          n.type === "checkin" || n.type === "system" || n.type === "message"
      );
    }

    return list;
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-28 -left-24 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br from-emerald-400/22 to-cyan-400/14 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-violet-400/18 to-fuchsia-400/12 blur-3xl" />
        <div className="absolute -bottom-36 left-1/3 h-[34rem] w-[34rem] rounded-full bg-gradient-to-br from-amber-300/14 to-rose-400/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.08)_1px,transparent_0)] [background-size:26px_26px] opacity-25" />
      </div>

      <div className="max-w-5xl mx-auto p-6 md:p-8 space-y-6">
        {/* Header */}
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
                Notifications
              </Badge>
              <Badge
                variant={unreadCount ? "secondary" : "outline"}
                className="gap-2"
              >
                <BellRing className="h-3.5 w-3.5" />
                {unreadCount} unread
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Inbox
            </h1>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Confirm matches, respond to challenges, and catch live activity
              around you.
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" asChild className="gap-2">
              <Link href="/home">
                <ArrowLeft className="h-4 w-4" />
                Home
              </Link>
            </Button>
            <Button className="gap-2">
              <Bell className="h-4 w-4" />
              Mark all read (mock)
            </Button>
          </div>
        </motion.div>

        {/* Filters strip */}
        <motion.div
          {...motionIn}
          transition={{ delay: 0.05, duration: 0.55, ease: "easeOut" }}
        >
          <Card className="shadow-xl overflow-hidden">
            <CardContent className="p-4 md:p-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-3">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <div className="space-y-0.5">
                  <div className="text-sm font-medium">Only unread</div>
                  <div className="text-xs text-muted-foreground">
                    Hide notifications you’ve already seen
                  </div>
                </div>
                <Switch checked={onlyUnread} onCheckedChange={setOnlyUnread} />
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" className="gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Today
                </Button>
                <Button variant="outline" className="gap-2">
                  <Radar className="h-4 w-4" />
                  Live
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          {...motionIn}
          transition={{ delay: 0.08, duration: 0.55, ease: "easeOut" }}
        >
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-base">Notifications</CardTitle>
              <CardDescription>
                UI-only. Later this becomes real-time.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all" className="gap-2">
                    <Sparkles className="h-4 w-4" />
                    All
                  </TabsTrigger>
                  <TabsTrigger value="requests" className="gap-2">
                    <BadgeCheck className="h-4 w-4" />
                    Requests
                  </TabsTrigger>
                  <TabsTrigger value="activity" className="gap-2">
                    <Radar className="h-4 w-4" />
                    Activity
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <NotifList items={filtered("all")} />
                </TabsContent>

                <TabsContent value="requests" className="mt-6">
                  <NotifList items={filtered("requests")} />
                </TabsContent>

                <TabsContent value="activity" className="mt-6">
                  <NotifList items={filtered("activity")} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="opacity-50" />
        <footer className="text-xs text-muted-foreground flex items-center justify-between">
          <span>Notifications UI prototype</span>
          <span>Next: Match confirm modal + Venue check-in</span>
        </footer>
      </div>
    </div>
  );
}

function NotifList({ items }: { items: Notif[] }) {
  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {items.map((n) => (
          <motion.div
            key={n.id}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            whileHover={{ y: -2 }}
          >
            <NotifCard n={n} />
          </motion.div>
        ))}
      </AnimatePresence>

      {items.length === 0 && (
        <Card className="shadow-lg">
          <CardContent className="p-10 text-center text-sm text-muted-foreground">
            You’re all caught up. No notifications match your filters.
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function NotifCard({ n }: { n: Notif }) {
  const icon =
    n.type === "match_confirm" ? (
      <BadgeCheck className="h-4 w-4" />
    ) : n.type === "challenge" ? (
      <Swords className="h-4 w-4" />
    ) : n.type === "checkin" ? (
      <Radar className="h-4 w-4" />
    ) : n.type === "message" ? (
      <MessageSquare className="h-4 w-4" />
    ) : (
      <ShieldAlert className="h-4 w-4" />
    );

  const pill =
    n.type === "match_confirm"
      ? { label: "Confirm", variant: "secondary" as const }
      : n.type === "challenge"
      ? { label: "Challenge", variant: "secondary" as const }
      : n.type === "checkin"
      ? { label: "Live", variant: "outline" as const }
      : n.type === "message"
      ? { label: "Message", variant: "outline" as const }
      : { label: "System", variant: "outline" as const };

  return (
    <Card className="relative overflow-hidden shadow-lg">
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-emerald-400/14 to-cyan-400/10 blur-2xl" />
        <div className="absolute -left-12 -bottom-12 h-28 w-28 rounded-full bg-gradient-to-br from-violet-400/12 to-fuchsia-400/10 blur-2xl" />
      </div>

      <CardContent className="relative p-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-2xl border bg-card/40 backdrop-blur shadow-sm">
            <span className="text-muted-foreground">{icon}</span>
          </div>

          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="text-sm font-semibold truncate">
                    {n.title}
                  </div>
                  <Badge variant={pill.variant}>{pill.label}</Badge>
                  {n.unread && <Badge variant="default">New</Badge>}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {n.body}
                </div>
              </div>
              <div className="text-[11px] text-muted-foreground shrink-0">
                {n.time}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2">
              <div className="text-[11px] text-muted-foreground inline-flex items-center gap-2 min-w-0">
                {n.venue ? (
                  <>
                    <MapPin className="h-3.5 w-3.5" />
                    <span className="truncate">
                      {n.venue.name} • {n.venue.area}
                    </span>
                  </>
                ) : (
                  <>
                    <Trophy className="h-3.5 w-3.5" />
                    <span className="truncate">{n.meta}</span>
                  </>
                )}
              </div>

              {n.cta ? (
                <Button
                  asChild
                  size="sm"
                  variant={n.cta.variant === "outline" ? "outline" : "default"}
                  className="gap-1"
                >
                  <Link href={n.cta.href}>
                    {n.cta.label} <ChevronRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <span className="text-[11px] text-muted-foreground">
                  {n.meta}
                </span>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
