"use client";

import { usePathname } from "next/navigation";
import AppHeader from "@/components/header/header";

const HIDDEN_ROUTES = new Set(["/", "/login", "/signup"]);

export default function ConditionalHeader() {
  const pathname = usePathname();

  if (!pathname || HIDDEN_ROUTES.has(pathname)) return null;

  const active = pathname.startsWith("/explore")
    ? "explore"
    : pathname.startsWith("/profile")
    ? "profile"
    : "home";

  const showSearch =
    pathname.startsWith("/explore") || pathname.startsWith("/home");

  return <AppHeader active={active} showSearch={showSearch} />;
}
