"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { toast } from "sonner";
import {
  CalendarDays,
  Clock,
  MapPin,
  User,
  ArrowLeft,
  Ticket,
} from "lucide-react";
import { EVENTS } from "@/data/events";
import { CategoryBadge } from "@/components/CategoryBadge";
import { formatDate, isUpcoming } from "@/lib/utils";
import { use } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

export default function EventDetailPage({ params }: Props) {
  const { id } = use(params);
  const event = EVENTS.find((e) => e.id === id);

  if (!event) notFound();

  const upcoming = isUpcoming(event.date);

  function handleRegister() {
    toast.success("Successfully registered for event 🎉", {
      description: `You're registered for ${event!.title}`,
      duration: 4000,
    });
  }

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-[#7c7a76] hover:text-amber-400 transition-colors mb-8 group"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Events
      </Link>

      {/* Banner */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden rounded-2xl mb-8">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 1024px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11] via-[#0f0f11]/30 to-transparent" />

        {/* Overlaid title on banner */}
        <div className="absolute bottom-0 left-0 p-8">
          <CategoryBadge category={event.category} className="mb-3" />
          <h1 className="font-syne text-3xl sm:text-4xl font-800 text-white leading-tight max-w-2xl drop-shadow-lg">
            {event.title}
          </h1>
        </div>

        {/* Status */}
        <div className="absolute top-4 right-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium backdrop-blur-sm ${
              upcoming
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                : "bg-black/40 text-[#7c7a76] border border-white/10"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${upcoming ? "bg-amber-400 animate-pulse" : "bg-[#7c7a76]"}`}
            />
            {upcoming ? "Upcoming" : "Past Event"}
          </span>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="rounded-2xl border border-[#2a2a35] bg-[#16161a] p-6">
            <h2 className="font-syne text-lg font-semibold text-[#e8e6e1] mb-4">
              About This Event
            </h2>
            <p className="text-[#7c7a76] leading-relaxed text-sm">
              {event.fullDescription}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Details card */}
          <div className="rounded-2xl border border-[#2a2a35] bg-[#16161a] p-6 space-y-4">
            <h2 className="font-syne text-sm font-semibold text-[#e8e6e1] uppercase tracking-wider">
              Event Details
            </h2>

            <div className="space-y-3">
              <DetailRow
                icon={CalendarDays}
                label="Date"
                value={formatDate(event.date)}
              />
              <DetailRow icon={Clock} label="Time" value={event.time} />
              <DetailRow
                icon={MapPin}
                label="Location"
                value={event.location}
              />
              <DetailRow
                icon={User}
                label="Organizer"
                value={event.organizer}
              />
            </div>

            <div className="pt-2 border-t border-[#2a2a35]">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#7c7a76]">Category</span>
                <CategoryBadge category={event.category} />
              </div>
            </div>
          </div>

          {/* Register card */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6">
            <div className="flex items-center gap-2 mb-2">
              <Ticket className="h-4 w-4 text-amber-400" />
              <span className="font-syne text-sm font-semibold text-[#e8e6e1]">
                {upcoming ? "Register Now" : "Event Ended"}
              </span>
            </div>
            <p className="text-xs text-[#7c7a76] mb-4">
              {upcoming
                ? "Secure your spot for this event before registration closes."
                : "This event has already taken place."}
            </p>
            <button
              onClick={handleRegister}
              disabled={!upcoming}
              className={`w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                upcoming
                  ? "bg-amber-500 hover:bg-amber-400 text-[#0f0f11] hover:shadow-lg hover:shadow-amber-500/20 active:scale-[0.98]"
                  : "bg-[#2a2a35] text-[#4a4a52] cursor-not-allowed"
              }`}
            >
              {upcoming ? "Register for Event" : "Registration Closed"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1e1e24] border border-[#2a2a35]">
        <Icon className="h-3.5 w-3.5 text-amber-500/70" />
      </div>
      <div>
        <p className="text-xs text-[#4a4a52] uppercase tracking-wide">
          {label}
        </p>
        <p className="text-sm text-[#e8e6e1] leading-snug">{value}</p>
      </div>
    </div>
  );
}
