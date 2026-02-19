import Link from "next/link";
import Image from "next/image";
import { CalendarDays, MapPin, ArrowRight } from "lucide-react";
import { CategoryBadge } from "@/components/CategoryBadge";
import { formatDate, isUpcoming } from "@/lib/utils";
import type { Event } from "@/data/events";

interface Props {
  event: Event;
}

export function EventCard({ event }: Props) {
  const upcoming = isUpcoming(event.date);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-[#2a2a35] bg-[#16161a] card-hover">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#16161a] via-transparent to-transparent" />

        {/* Status pill */}
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
              upcoming
                ? "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                : "bg-[#2a2a35] text-[#7c7a76] border border-[#3a3a40]"
            }`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${upcoming ? "bg-amber-400" : "bg-[#7c7a76]"}`} />
            {upcoming ? "Upcoming" : "Past"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5 gap-3">
        <div className="flex items-start justify-between gap-2">
          <CategoryBadge category={event.category} />
        </div>

        <h3 className="font-syne text-base font-semibold leading-snug text-[#e8e6e1] line-clamp-2 group-hover:text-amber-400 transition-colors">
          {event.title}
        </h3>

        <p className="text-sm text-[#7c7a76] line-clamp-2 leading-relaxed flex-1">
          {event.description}
        </p>

        <div className="space-y-1.5 text-xs text-[#7c7a76]">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-3.5 w-3.5 text-amber-500/60 shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-amber-500/60 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-[#2a2a35]">
          <Link
            href={`/events/${event.id}`}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#1e1e24] hover:bg-amber-500/10 border border-[#2a2a35] hover:border-amber-500/30 px-4 py-2.5 text-sm font-medium text-[#e8e6e1] hover:text-amber-400 transition-all duration-200 group/btn"
          >
            View Details
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}