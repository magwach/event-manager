"use client";

export function EventDetailSkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-8">
      {/* Back */}
      <div className="h-4 w-32 rounded-lg bg-[#2a2a35] animate-pulse" />

      {/* Banner */}
      <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden rounded-2xl bg-[#1e1e24] animate-pulse" />

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-[#2a2a35] bg-[#16161a] p-6 space-y-4">
            <div className="h-6 w-48 bg-[#2a2a35] rounded-md animate-pulse" />
            <div className="space-y-2">
              <div className="h-3 w-full bg-[#2a2a35] rounded-md animate-pulse" />
              <div className="h-3 w-5/6 bg-[#2a2a35] rounded-md animate-pulse" />
              <div className="h-3 w-11/12 bg-[#2a2a35] rounded-md animate-pulse" />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Details Card */}
          <div className="rounded-2xl border border-[#2a2a35] bg-[#16161a] p-6 space-y-4">
            <div className="h-5 w-32 bg-[#2a2a35] rounded-md animate-pulse" />
            <div className="space-y-3">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-8 w-8 bg-[#1e1e24] border border-[#2a2a35] rounded-lg animate-pulse" />
                  <div className="flex-1 space-y-1">
                    <div className="h-2 w-1/3 bg-[#2a2a35] rounded-md animate-pulse" />
                    <div className="h-3 w-2/3 bg-[#2a2a35] rounded-md animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Register Card */}
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 space-y-3">
            <div className="h-4 w-40 bg-[#2a2a35] rounded-md animate-pulse" />
            <div className="h-3 w-full bg-[#2a2a35] rounded-md animate-pulse" />
            <div className="h-10 w-full bg-[#2a2a35] rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}