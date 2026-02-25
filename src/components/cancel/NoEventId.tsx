"use client";

import Link from "next/link";
import { ShieldAlert, Home } from "lucide-react";

export function NoEventId() {
  return (
    <div className="min-h-screen bg-[#0f0f11] px-4 py-12 flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-md text-center">

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-[#2a2a35] scale-150 blur-xl" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#2a2a35] bg-[#16161a]">
              <ShieldAlert className="h-10 w-10 text-[#4a4a52]" />
            </div>
          </div>
        </div>

        <h1 className="font-syne text-2xl font-bold text-[#e8e6e1] mb-2">
          Invalid page access
        </h1>
        <p className="text-sm text-[#7c7a76] max-w-xs mx-auto leading-relaxed mb-8">
          This page can only be reached from an event checkout. No event was
          specified in the URL.
        </p>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-6 py-3 text-sm font-bold text-[#0f0f11] transition-colors"
        >
          <Home className="h-4 w-4" />
          Browse Events
        </Link>

      </div>
    </div>
  );
}