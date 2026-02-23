"use client";

export function EventCardSkeleton() {
  return (
    <div className="animate-pulse flex flex-col overflow-hidden rounded-2xl border border-[#2a2a35] bg-[#16161a]">
      {/* Image skeleton */}
      <div className="h-48 bg-[#0f0f11]" />

      {/* Content */}
      <div className="p-5 space-y-4">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <div className="h-5 w-20 rounded-full bg-[#0f0f11]" />
          <div className="h-4 w-12 rounded bg-[#0f0f11]" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 w-3/4 rounded bg-[#0f0f11]" />
          <div className="h-4 w-1/2 rounded bg-[#0f0f11]" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 w-full rounded bg-[#0f0f11]" />
          <div className="h-3 w-5/6 rounded bg-[#0f0f11]" />
        </div>

        {/* Info rows */}
        <div className="space-y-2 pt-2">
          <div className="h-3 w-2/3 rounded bg-[#0f0f11]" />
          <div className="h-3 w-1/2 rounded bg-[#0f0f11]" />
          <div className="h-3 w-3/4 rounded bg-[#0f0f11]" />
          <div className="h-3 w-1/3 rounded bg-[#0f0f11]" />
        </div>

        {/* Organizer */}
        <div className="h-3 w-1/2 rounded bg-[#0f0f11]" />

        {/* Button */}
        <div className="pt-2">
          <div className="h-10 w-full rounded-xl bg-[#0f0f11]" />
        </div>
      </div>
    </div>
  );
}