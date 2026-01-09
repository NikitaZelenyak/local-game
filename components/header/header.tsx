"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Compass,
  Map,
  Sparkles,
  Trophy,
  User,
  Zap,
  Search,
  Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type HeaderProps = {
  active?: "home" | "explore" | "profile";
  showSearch?: boolean;
};

export default function AppHeader({
  active = "home",
  showSearch = true,
}: HeaderProps) {
  const motionIn = useMemo(
    () => ({
      initial: { y: -8, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { duration: 0.4, ease: "easeOut" as const },
    }),
    []
  );

  const navItem = (
    key: HeaderProps["active"],
    href: string,
    label: string,
    Icon: any
  ) => {
    const isActive = active === key;
    return (
      <Button
        asChild
        variant={isActive ? "default" : "ghost"}
        size="sm"
        className={
          isActive
            ? "gap-2"
            : "gap-2 text-muted-foreground hover:text-foreground"
        }
      >
        <Link href={href}>
          <Icon className="h-4 w-4" />
          {label}
        </Link>
      </Button>
    );
  };

  return (
    <motion.header
      {...motionIn}
      className="sticky top-0 z-50 border-b bg-background/60 backdrop-blur-xl"
    >
      {/* subtle glow */}
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -left-24 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-emerald-400/18 to-cyan-400/10 blur-2xl" />
        <div className="absolute -right-24 -top-16 h-44 w-44 rounded-full bg-gradient-to-br from-violet-400/14 to-fuchsia-400/10 blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/" className="flex items-center gap-2 min-w-0">
              <div className="h-9 w-9 rounded-2xl border bg-card/40 backdrop-blur flex items-center justify-center shadow-sm">
                <Zap className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold leading-tight truncate">
                  Local Ladder
                </div>
                <div className="text-[11px] text-muted-foreground leading-tight truncate">
                  Toronto courts & tables
                </div>
              </div>
            </Link>

            <div className="hidden sm:flex items-center gap-2">
              <Badge variant="secondary" className="gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                Beta
              </Badge>
              <Badge variant="outline" className="gap-2">
                <Trophy className="h-3.5 w-3.5" />
                Ranked
              </Badge>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItem("home", "/home", "Home", Compass)}
            {navItem("explore", "/explore", "Explore", Map)}
            {navItem("profile", "/profile", "Profile", User)}
          </nav>

          {/* Search */}
          {showSearch && (
            <div className="hidden lg:flex flex-1 max-w-[420px] mx-3">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search venues… (High Park, Waterfront)"
                  className="pl-9 bg-card/40 backdrop-blur"
                />
              </div>
            </div>
          )}

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Button className="hidden sm:inline-flex" asChild>
              <Link href="/explore">Check in</Link>
            </Button>

            <Separator orientation="vertical" className="hidden sm:block h-7" />

            <div className="hidden sm:flex items-center gap-2 rounded-full border bg-card/40 backdrop-blur px-2 py-1">
              <Avatar className="h-7 w-7">
                <AvatarImage src="" />
                <AvatarFallback>NZ</AvatarFallback>
              </Avatar>
              <div className="leading-tight pr-2">
                <div className="text-xs font-semibold">Nikita</div>
                <div className="text-[10px] text-muted-foreground">Toronto</div>
              </div>
            </div>

            {/* Mobile menu */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" aria-label="Menu">
                    <Menu className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-44">
                  <DropdownMenuItem asChild>
                    <Link href="/home">Home</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/explore">Explore</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/explore">Check in</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Mobile search */}
        {showSearch && (
          <div className="mt-3 lg:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search venues…"
                className="pl-9 bg-card/40 backdrop-blur"
              />
            </div>
          </div>
        )}
      </div>
    </motion.header>
  );
}
