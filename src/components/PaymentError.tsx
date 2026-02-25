"use client";

import Link from "next/link";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

interface Props {
  sessionId?: string | null;
}

export function PaymentError({ sessionId }: Props) {
  return (
    <div className="min-h-screen bg-[#0f0f11] px-4 py-12 flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-md">
        {/* Icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-5">
            <div className="absolute inset-0 rounded-full bg-rose-500/10 scale-150 blur-xl" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-rose-500/30 bg-rose-500/10">
              <AlertCircle className="h-10 w-10 text-rose-400" />
            </div>
          </div>
          <h1 className="font-syne text-3xl font-bold text-[#e8e6e1] mb-2">
            Something went wrong
          </h1>
          <p className="text-sm text-[#7c7a76] max-w-xs leading-relaxed">
            We couldn't confirm your booking. Your payment may have been
            processed — please do not pay again before contacting support.
          </p>
        </div>

        {/* Detail card */}
        <div className="rounded-2xl border border-[#2a2a35] bg-[#16161a] overflow-hidden mb-5">
          <div className="flex items-center gap-2 px-5 py-4 border-b border-[#2a2a35] bg-[#0f0f11]">
            <span className="h-2 w-2 rounded-full bg-rose-400" />
            <span className="font-syne text-sm font-semibold text-[#e8e6e1]">
              Error Details
            </span>
          </div>
          <div className="p-5 space-y-3">
            <div className="rounded-xl border border-[#2a2a35] bg-[#0f0f11] px-4 py-3">
              <p className="text-[10px] text-[#4a4a52] uppercase tracking-wider mb-1">
                What happened
              </p>
              <p className="text-sm text-[#7c7a76] leading-relaxed">
                We received your payment but failed to create your booking
                record. This is usually a temporary server issue.
              </p>
            </div>

            {sessionId && (
              <div className="rounded-xl border border-[#2a2a35] bg-[#0f0f11] px-4 py-3">
                <p className="text-[10px] text-[#4a4a52] uppercase tracking-wider mb-1">
                  Session ID
                </p>
                <p className="text-xs font-mono text-amber-400/70 break-all">
                  {sessionId}
                </p>
                <p className="text-[10px] text-[#4a4a52] mt-1.5">
                  Share this with support so we can locate your payment.
                </p>
              </div>
            )}

            {/* What to do next */}
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
              <p className="text-[10px] text-amber-500/70 uppercase tracking-wider mb-2">
                What to do next
              </p>
              <ul className="space-y-1.5">
                {[
                  "Wait a few minutes — your booking may still complete.",
                  "Check your email for a confirmation.",
                  "If no email arrives, contact support with the Session ID above.",
                ].map((step, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-xs text-[#7c7a76]"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-semibold text-amber-400">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => window.location.reload()}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-3 text-sm font-bold text-[#0f0f11] transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>

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
