"use client";

export function AdminTableSkeleton() {
  const pulse = "animate-pulse bg-[#2a2a35] rounded";

  return (
    <div className="rounded-2xl border border-[#2a2a35] bg-[#16161a] overflow-hidden">
      {/* Table header */}
      <div className="border-b border-[#2a2a35] px-6 py-4">
        <div className={`${pulse} h-4 w-40`} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#2a2a35]">
              {[
                "Title",
                "Category",
                "Date",
                "Price",
                "Capacity",
                "Status",
                "Actions",
              ].map((col) => (
                <th
                  key={col}
                  className={`px-6 py-3 ${col === "Actions" ? "text-right" : ""}`}
                >
                  <div className={`${pulse} h-3 w-16`} />
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[#2a2a35]">
            {Array.from({ length: 6 }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                <td className="px-6 py-4">
                  <div className={`${pulse} h-4 w-36 mb-2`} />
                  <div className={`${pulse} h-3 w-24`} />
                </td>

                <td className="px-6 py-4">
                  <div className={`${pulse} h-5 w-16 rounded-full`} />
                </td>

                <td className="px-6 py-4">
                  <div className={`${pulse} h-3 w-24`} />
                </td>

                <td className="px-6 py-4">
                  <div className={`${pulse} h-5 w-20 rounded-full`} />
                </td>

                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <div className={`${pulse} h-3 w-20`} />
                    <div className="h-1 w-full rounded-full bg-[#2a2a35]">
                      <div
                        className={`${pulse} h-full rounded-full`}
                        style={{ width: `${30 + ((rowIdx * 13) % 60)}%` }}
                      />
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <div className={`${pulse} h-6 w-20 rounded-full`} />
                </td>

                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <div className={`${pulse} h-7 w-14 rounded-lg`} />
                    <div className={`${pulse} h-7 w-16 rounded-lg`} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
