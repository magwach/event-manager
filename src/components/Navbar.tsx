"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser, useClerk } from "@clerk/nextjs";
import { cn } from "@/lib/clent-utils/utils";
import {
  Calendar,
  LayoutDashboard,
  Zap,
  LogIn,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

const ADMIN_EMAILS = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(",") ?? [];
export function Navbar() {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();
  const { signOut, openSignIn } = useClerk();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const isAdmin = isLoaded && !!userEmail && ADMIN_EMAILS.includes(userEmail);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { href: "/", label: "Home", icon: Calendar },
    ...(isAdmin
      ? [{ href: "/admin", label: "Admin", icon: LayoutDashboard }]
      : []),
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#2a2a35] bg-[#0f0f11]/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-[#0f0f11] transition-transform group-hover:scale-110">
              <Zap className="h-4 w-4 fill-current" />
            </div>
            <span className="font-syne text-lg font-bold tracking-tight text-[#e8e6e1]">
              Event<span className="text-amber-400">Flow</span>
            </span>
          </Link>

          {/* ── Nav Links ── */}
          <nav className="flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-amber-500/15 text-amber-400"
                      : "text-[#7c7a76] hover:bg-[#1e1e24] hover:text-[#e8e6e1]",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </nav>

          {/* ── Auth Area ── */}
          <div className="flex items-center gap-2 shrink-0">
            {!isLoaded ? (
              // Loading skeleton
              <div className="h-8 w-24 rounded-lg bg-[#2a2a35] animate-pulse" />
            ) : user ? (
              // ── User dropdown ──
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((o) => !o)}
                  className="flex items-center gap-2 rounded-xl border border-[#2a2a35] bg-[#16161a] px-3 py-1.5 text-sm text-[#e8e6e1] hover:border-amber-500/30 hover:bg-[#1e1e24] transition-all"
                >
                  {/* Avatar */}
                  {user.imageUrl ? (
                    <div className="relative h-6 w-6 rounded-lg overflow-hidden">
                      <Image
                        src={user.imageUrl}
                        alt="avatar"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/20">
                      <User className="h-3.5 w-3.5 text-amber-400" />
                    </div>
                  )}
                  <span className="hidden sm:inline max-w-[120px] truncate font-medium">
                    {user.firstName ?? user.primaryEmailAddress?.emailAddress}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 text-[#7c7a76] transition-transform duration-200",
                      dropdownOpen && "rotate-180",
                    )}
                  />
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl border border-[#2a2a35] bg-[#16161a] shadow-xl shadow-black/40 overflow-hidden">
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-[#2a2a35]">
                      <p className="text-xs font-medium text-[#e8e6e1] truncate">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-[#4a4a52] truncate">
                        {user.primaryEmailAddress?.emailAddress}
                      </p>
                      {isAdmin && (
                        <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-400">
                          <LayoutDashboard className="h-2.5 w-2.5" />
                          Admin
                        </span>
                      )}
                    </div>

                    {/* Menu items */}
                    <div className="py-1">
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                          pathname === "/profile"
                            ? "text-amber-400 bg-amber-500/5"
                            : "text-[#7c7a76] hover:bg-[#1e1e24] hover:text-[#e8e6e1]",
                        )}
                      >
                        <User className="h-4 w-4" />
                        My Profile
                      </Link>

                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setDropdownOpen(false)}
                          className={cn(
                            "flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                            pathname === "/admin"
                              ? "text-amber-400 bg-amber-500/5"
                              : "text-[#7c7a76] hover:bg-[#1e1e24] hover:text-[#e8e6e1]",
                          )}
                        >
                          <LayoutDashboard className="h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      )}
                    </div>

                    {/* Sign out */}
                    <div className="border-t border-[#2a2a35] py-1">
                      <button
                        onClick={() => {
                          signOut();
                          setDropdownOpen(false);
                        }}
                        className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-[#7c7a76] hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // ── Sign In button ──
              <button
                onClick={() => openSignIn()}
                className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-4 py-2 text-sm font-semibold text-[#0f0f11] transition-colors"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
