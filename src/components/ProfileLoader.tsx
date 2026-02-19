export function ProfileSkeleton() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 animate-pulse">
      {/* Header skeleton */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-10 p-6 rounded-2xl border border-[#2a2a35] bg-[#16161a]">
        {/* Avatar */}
        <div className="h-20 w-20 rounded-2xl bg-[#2a2a35]" />

        <div className="flex-1 space-y-3">
          {/* Name */}
          <div className="h-6 w-48 rounded-lg bg-[#2a2a35]" />
          {/* Email */}
          <div className="h-4 w-64 rounded-lg bg-[#2a2a35]" />
          {/* Phone */}
          <div className="h-4 w-40 rounded-lg bg-[#2a2a35]" />
        </div>

        {/* Badge */}
        <div className="h-7 w-24 rounded-full bg-[#2a2a35]" />
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-2xl border border-[#2a2a35] bg-[#16161a] p-5 space-y-3">
            <div className="h-3 w-20 rounded-lg bg-[#2a2a35]" />
            <div className="h-8 w-12 rounded-lg bg-[#2a2a35]" />
          </div>
        ))}
      </div>

      {/* Section title */}
      <div className="h-5 w-40 rounded-lg bg-[#2a2a35] mb-6" />

      {/* Event cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-[#2a2a35] bg-[#16161a] overflow-hidden"
          >
            {/* Image placeholder */}
            <div className="h-40 bg-[#2a2a35]" />
            <div className="p-4 space-y-3">
              {/* Badge + title */}
              <div className="h-4 w-16 rounded-full bg-[#2a2a35]" />
              <div className="h-5 w-full rounded-lg bg-[#2a2a35]" />
              {/* Date */}
              <div className="h-3 w-32 rounded-lg bg-[#2a2a35]" />
              {/* Receipt */}
              <div className="h-3 w-24 rounded-lg bg-[#2a2a35]" />
              {/* Button */}
              <div className="h-8 w-full rounded-xl bg-[#2a2a35] mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}