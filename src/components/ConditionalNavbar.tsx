"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/Navbar";

const HIDE_NAVBAR_PATHS = ["/", "/policy", "/terms-of-service", "/sign-in", "/sign-up"];

export function ConditionalNavbar() {
  const pathname = usePathname();
  const hide = HIDE_NAVBAR_PATHS.some((path) => pathname === path);
  if (hide) return null;
  return <Navbar />;
}