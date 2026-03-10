"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  XCircle,
  RotateCcw,
  Home,
  Ticket,
  CalendarDays,
  MapPin,
  Clock,
} from "lucide-react";
import { useGetEventDetails } from "@/hooks/use-events";
import { NoEventId } from "@/components/cancel/NoEventId";
import { CancelSkeleton } from "@/components/cancel/CancelSkeleton";
import { CancelError } from "@/components/cancel/CancelError";

export default function CancelPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");

  if (!eventId) return <NoEventId />;

  const { data: event, isError, isLoading } = useGetEventDetails(eventId);

  if (isLoading) return <CancelSkeleton />;
  if (isError) return <CancelError />;

  return (
    <div className="min-h-screen bg-[#0f0f11] px-4 py-12 animate-fade-in">
      <div className="mx-auto max-w-lg">
        {/* Cancel icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-5">
            <div className="absolute inset-0 rounded-full bg-rose-500/10 scale-150 blur-xl" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-rose-500/30 bg-rose-500/10">
              <XCircle className="h-10 w-10 text-rose-400" />
            </div>
          </div>
          <h1 className="font-syne text-3xl font-bold text-[#e8e6e1] mb-2">
            Payment Cancelled
          </h1>
          <p className="text-sm text-[#7c7a76] max-w-xs leading-relaxed">
            No charge was made. Your booking was not completed — you can try
            again whenever you're ready.
          </p>
        </div>

        {/* Event reminder */}
        <div className="rounded-2xl border border-[#2a2a35] bg-[#16161a] p-5 mb-5">
          <p className="text-[10px] font-medium text-[#4a4a52] uppercase tracking-wider mb-3">
            You were booking
          </p>

          <div className="flex items-start gap-3 mb-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
              <Ticket className="h-4 w-4 text-amber-400" />
            </div>
            <div>
              <p className="font-syne font-semibold text-[#e8e6e1] text-sm leading-snug">
                {event?.title}
              </p>
              <span className="inline-flex items-c  enter mt-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-400">
                {event?.category}
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-[#2a2a35]">
            <div className="flex items-center gap-3">
              <CalendarDays className="h-3.5 w-3.5 text-amber-500/50 shrink-0" />
              <span className="text-xs text-[#7c7a76]">
                {event?.date.toDateString()}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-3.5 w-3.5 text-amber-500/50 shrink-0" />
              <span className="text-xs text-[#7c7a76]">{event?.time}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="h-3.5 w-3.5 text-amber-500/50 shrink-0" />
              <span className="text-xs text-[#7c7a76]">{event?.location}</span>
            </div>
          </div>

          {/* Low spots urgency nudge */}
          {event?.remainingCapacity! <= 50 && (
            <div className="mt-4 flex items-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/5 px-3 py-2.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse shrink-0" />
              <p className="text-xs text-amber-400/80">
                Only{" "}
                <span className="font-semibold text-amber-400">
                  {event?.remainingCapacity} spots
                </span>{" "}
                left — don't miss out.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => router.push(`/event/${eventId}`)}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-3 text-sm font-bold text-[#0f0f11] transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </button>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href={`/${eventId}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#2a2a35] bg-transparent px-4 py-2.5 text-xs font-medium text-[#7c7a76] hover:bg-[#1e1e24] hover:text-[#e8e6e1] transition-all"
            >
              <Ticket className="h-3.5 w-3.5" />
              Event Details
            </Link>
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
    </div>
  );
}
