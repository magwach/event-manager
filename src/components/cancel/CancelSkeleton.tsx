"use client";

export function CancelSkeleton() {
  const pulse = "animate-pulse bg-[#2a2a35] rounded-lg";

  return (
    <div className="min-h-screen bg-[#0f0f11] px-4 py-12">
      <div className="mx-auto max-w-lg">

        {/* Icon + title */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className={`${pulse} h-20 w-20 rounded-full mb-5`} />
          <div className={`${pulse} h-8 w-52 mb-3`} />
          <div className={`${pulse} h-4 w-72`} />
        </div>

        {/* Event reminder card */}
        <div className="rounded-2xl border border-[#2a2a35] bg-[#16161a] p-5 mb-5">
          <div className={`${pulse} h-3 w-24 mb-4`} />

          {/* Event row */}
          <div className="flex items-start gap-3 mb-4">
            <div className={`${pulse} h-9 w-9 rounded-xl shrink-0`} />
            <div className="flex-1 space-y-2">
              <div className={`${pulse} h-4 w-48`} />
              <div className={`${pulse} h-5 w-16 rounded-full`} />
            </div>
          </div>

          {/* Detail rows */}
          <div className="space-y-3 pt-3 border-t border-[#2a2a35]">
            {[40, 28, 52].map((w, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className={`${pulse} h-3.5 w-3.5 rounded shrink-0`} />
                <div className={`${pulse} h-3`} style={{ width: `${w}%` }} />
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="space-y-3">
          <div className={`${pulse} h-12 w-full rounded-xl`} />
          <div className="grid grid-cols-2 gap-3">
            <div className={`${pulse} h-10 rounded-xl`} />
            <div className={`${pulse} h-10 rounded-xl`} />
          </div>
        </div>

      </div>
    </div>
  );
}