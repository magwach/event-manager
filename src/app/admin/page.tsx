"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Trash2,
  LayoutDashboard,
  Calendar,
  Tag,
  ListFilter,
} from "lucide-react";
import { EVENTS } from "@/data/events";
import { CategoryBadge } from "@/components/CategoryBadge";
import { AddEventDialog } from "@/components/AddEventDialog";
import { formatDate, isUpcoming } from "@/lib/utils";
import type { Event } from "@/data/events";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [events, setEvents] = useState<Event[]>(EVENTS);
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;


  function handleAdd(newEvent: Event) {
    setEvents((prev) => [newEvent, ...prev]);
  }

  function handleDelete(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
    toast.error("Event deleted", { duration: 3000 });
  }

  const upcoming = events.filter((e) => isUpcoming(e.date)).length;
  const past = events.length - upcoming;

  useEffect(() => {
    if (!isLoaded) return;
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!user || email !== ADMIN_EMAIL) {
      toast.error("Access denied. Admins only.");
      router.replace("/");
    }
  }, [isLoaded, user, router]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <LayoutDashboard className="h-5 w-5 text-amber-500" />
          <span className="text-xs font-medium text-amber-500 uppercase tracking-widest">
            Admin
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-syne text-4xl font-800 text-[#e8e6e1] mb-2">
              Event Manager
            </h1>
            <p className="text-[#7c7a76]">
              Manage, add, and remove events from your dashboard.
            </p>
          </div>
          <AddEventDialog onAdd={handleAdd} />
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <StatCard
          label="Total Events"
          value={events.length}
          icon={ListFilter}
        />
        <StatCard label="Upcoming" value={upcoming} icon={Calendar} highlight />
        <StatCard label="Past" value={past} icon={Tag} />
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#2a2a35] bg-[#16161a] overflow-hidden">
        {/* Table header */}
        <div className="border-b border-[#2a2a35] px-6 py-4">
          <h2 className="font-syne text-sm font-semibold text-[#e8e6e1]">
            All Events ({events.length})
          </h2>
        </div>

        {events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Calendar className="h-10 w-10 text-[#2a2a35] mb-3" />
            <p className="text-[#7c7a76] text-sm">
              No events yet. Add one above.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2a2a35]">
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4a4a52] uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4a4a52] uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4a4a52] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#4a4a52] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-[#4a4a52] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2a2a35]">
                {events.map((event) => {
                  const upcoming = isUpcoming(event.date);
                  return (
                    <tr
                      key={event.id}
                      className="group hover:bg-[#1e1e24] transition-colors"
                    >
                      {/* Title */}
                      <td className="px-6 py-4">
                        <div className="font-medium text-[#e8e6e1] group-hover:text-amber-400 transition-colors truncate max-w-[200px]">
                          {event.title}
                        </div>
                        <div className="text-xs text-[#4a4a52] truncate max-w-[200px] mt-0.5">
                          {event.organizer}
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4">
                        <CategoryBadge category={event.category} />
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-[#7c7a76] whitespace-nowrap">
                        {formatDate(event.date)}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                            upcoming
                              ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                              : "bg-[#2a2a35] text-[#7c7a76] border border-[#3a3a40]"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              upcoming ? "bg-amber-400" : "bg-[#7c7a76]"
                            }`}
                          />
                          {upcoming ? "Upcoming" : "Past"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleDelete(event.id)}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#2a2a35] bg-transparent px-3 py-1.5 text-xs font-medium text-[#7c7a76] hover:bg-rose-500/10 hover:border-rose-500/30 hover:text-rose-400 transition-all"
                            title="Delete event"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  highlight = false,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? "border-amber-500/20 bg-amber-500/5"
          : "border-[#2a2a35] bg-[#16161a]"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-[#7c7a76] uppercase tracking-wider">
          {label}
        </span>
        <div
          className={`h-7 w-7 rounded-lg flex items-center justify-center ${
            highlight ? "bg-amber-500/20" : "bg-[#1e1e24]"
          }`}
        >
          <Icon
            className={`h-3.5 w-3.5 ${highlight ? "text-amber-400" : "text-[#4a4a52]"}`}
          />
        </div>
      </div>
      <p
        className={`font-syne text-3xl font-bold ${highlight ? "text-amber-400" : "text-[#e8e6e1]"}`}
      >
        {value}
      </p>
    </div>
  );
}
