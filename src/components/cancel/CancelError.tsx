"use client";

import Link from "next/link";
import { AlertCircle, Home, HelpCircle } from "lucide-react";

export function CancelError() {
  return (
    <div className="min-h-screen bg-[#0f0f11] px-4 py-12 flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-md text-center">

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-rose-500/10 scale-150 blur-xl" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-rose-500/30 bg-rose-500/10">
              <AlertCircle className="h-10 w-10 text-rose-400" />
            </div>
          </div>
        </div>

        <h1 className="font-syne text-2xl font-bold text-[#e8e6e1] mb-2">
          Could not load event
        </h1>
        <p className="text-sm text-[#7c7a76] max-w-xs mx-auto leading-relaxed mb-8">
          We couldn&apos;t fetch the event details. Your payment was not charged.
        </p>

        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
          <a
            href="mailto:support@eventflow.co.ke"
            className="flex items-center justify-center gap-2 rounded-xl border border-[#2a2a35] bg-transparent px-4 py-2.5 text-xs font-medium text-[#7c7a76] hover:bg-[#1e1e24] hover:text-[#e8e6e1] transition-all"
          >
            <HelpCircle className="h-3.5 w-3.5" />
            Support
          </a>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 rounded-xl border border-[#2a2a35] bg-transparent px-4 py-2.5 text-xs font-medium text-[#7c7a76] hover:bg-[#1e1e24] hover:text-[#e8e6e1] transition-all"
          >
            <Home className="h-3.5 w-3.5" />
            Browse Events
          </Link>
        </div>

      </div>
    </div>
  );
}