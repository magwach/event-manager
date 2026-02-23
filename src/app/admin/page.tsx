"use client";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  Trash2,
  LayoutDashboard,
  Calendar,
  Tag,
  ListFilter,
  AlertTriangle,
  X,
  Users,
  Loader2,
} from "lucide-react";
import { CategoryBadge } from "@/components/CategoryBadge";
import { AddEventDialog } from "@/components/AddEventDialog";
import { formatDate, isUpcoming } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { EditEventDialog } from "@/components/EditEventDialog";
import { AdminTableSkeleton } from "@/components/AdminTableSkeleton";
import { Event } from "@/generated/prisma/client";
import { useDeleteEvent, useGetAllEvents } from "@/hooks/use-events";

export default function AdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [pendingDelete, setPendingDelete] = useState<Event | null>(null);

  const { data, isLoading } = useGetAllEvents();

  const { mutate: deleteEvent, isPending } = useDeleteEvent();

  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  function requestDelete(event: Event) {
    setPendingDelete(event);
  }

  function confirmDelete() {
    if (!pendingDelete) return;
    deleteEvent(pendingDelete?.id, {
      onSuccess: () => {
        toast.success("Event deleted successfully");
        setPendingDelete(null);
      },
      onError: () => {
        toast.error("Failed to add Event");
      },
    });
  }

  function cancelDelete() {
    setPendingDelete(null);
  }

  const upcoming = events.filter((e) => isUpcoming(e.date)).length;
  const past = events.length - upcoming;
  const soldOut = events.filter((e) => e.remainingCapacity === 0).length;

  useEffect(() => {
    if (!isLoaded) return;
    const email = user?.primaryEmailAddress?.emailAddress;
    if (!user || email !== ADMIN_EMAIL) {
      toast.error("Access denied. Admins only.");
      router.replace("/");
    }
  }, [isLoaded, user, router]);

  useEffect(() => {
    if (!isLoading && data) setEvents(data);
  }, [data, isLoading]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      {/* ── Delete Confirmation Modal ─────────────────────────────────────── */}
      {pendingDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={cancelDelete}
          />
          <div className="relative z-10 w-full max-w-md rounded-2xl border border-[#2a2a35] bg-[#16161a] shadow-2xl animate-fade-in">
            <button
              onClick={cancelDelete}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-[#4a4a52] hover:bg-[#2a2a35] hover:text-[#e8e6e1] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/10 border border-rose-500/20 mb-5">
                <AlertTriangle className="h-6 w-6 text-rose-400" />
              </div>
              <h2 className="font-syne text-lg font-bold text-[#e8e6e1] mb-2">
                Delete Event?
              </h2>
              <p className="text-sm text-[#7c7a76] leading-relaxed">
                You&apos;re about to permanently delete{" "}
                <span className="font-semibold text-[#e8e6e1]">
                  &ldquo;{pendingDelete?.title}&rdquo;
                </span>
                . This action cannot be undone.
              </p>
              <div className="mt-4 rounded-xl border border-[#2a2a35] bg-[#0f0f11] px-4 py-3 flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                  <Calendar className="h-4 w-4 text-rose-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#e8e6e1] truncate">
                    {pendingDelete?.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <CategoryBadge category={pendingDelete?.category!} />
                    <span className="text-xs text-[#4a4a52]">
                      {formatDate(pendingDelete?.date!)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={cancelDelete}
                  disabled={isPending}
                  className={`flex-1 rounded-xl border border-[#2a2a35] bg-transparent px-4 py-2.5 text-sm font-medium transition-all
                        ${
                          isPending
                            ? "text-[#4a4a52] cursor-not-allowed opacity-60"
                            : "text-[#7c7a76] hover:bg-[#1e1e24] hover:text-[#e8e6e1]"
                        }`}
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDelete}
                  disabled={isPending}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2
                        ${
                          isPending
                            ? "bg-rose-500/70 cursor-not-allowed"
                            : "bg-rose-500 hover:bg-rose-400"
                        } text-white`}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      Yes, Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <LayoutDashboard className="h-5 w-5 text-amber-500" />
          <span className="text-xs font-medium text-amber-500 uppercase tracking-widest">
            Admin
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h1 className="font-syne text-4xl font-bold text-[#e8e6e1] mb-2">
              Event Manager
            </h1>
            <p className="text-[#7c7a76]">
              Manage, add, and remove events from your dashboard.
            </p>
          </div>
          <AddEventDialog />
        </div>
      </div>

      {/* ── Stats Row ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Events"
          value={events.length}
          icon={ListFilter}
        />
        <StatCard label="Upcoming" value={upcoming} icon={Calendar} highlight />
        <StatCard label="Past" value={past} icon={Tag} />
        <StatCard
          label="Sold Out"
          value={soldOut}
          icon={Users}
          danger={soldOut > 0}
        />
      </div>

      {/* ── Table ────────────────────────────────────────────────────────── */}
      {isLoading ? (
        <AdminTableSkeleton />
      ) : (
        <div className="rounded-2xl border border-[#2a2a35] bg-[#16161a] overflow-hidden">
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
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-[#4a4a52] uppercase tracking-wider">
                      Capacity
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
                    const up = isUpcoming(event.date);
                    const booked = event.capacity - event.remainingCapacity;
                    const fillPct = Math.round((booked / event.capacity) * 100);
                    const isSoldOut = event.remainingCapacity === 0;
                    const isAlmostFull = !isSoldOut && fillPct >= 80;

                    return (
                      <tr
                        key={event.id}
                        className="group hover:bg-[#1e1e24] transition-colors"
                      >
                        {/* Title */}
                        <td className="px-6 py-4">
                          <div className="font-medium text-[#e8e6e1] group-hover:text-amber-400 transition-colors truncate max-w-[160px]">
                            {event.title}
                          </div>
                          <div className="text-xs text-[#4a4a52] truncate max-w-[160px] mt-0.5">
                            {event.organizer}
                          </div>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4">
                          <CategoryBadge category={event.category} />
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-[#7c7a76] whitespace-nowrap text-xs">
                          {formatDate(event.date)}
                        </td>

                        {/* Price */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          {event.price === 0 ? (
                            <span className="inline-flex items-center rounded-full bg-green-500/10 border border-green-500/20 px-2 py-0.5 text-xs font-medium text-green-400">
                              Free
                            </span>
                          ) : (
                            <span className="text-xs font-medium text-[#e8e6e1]">
                              KES {event.price.toLocaleString()}
                            </span>
                          )}
                        </td>

                        {/* Capacity */}
                        <td className="px-6 py-4">
                          <div className="min-w-[130px] space-y-1">
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-xs font-medium ${isSoldOut ? "text-rose-400" : isAlmostFull ? "text-amber-400" : "text-[#7c7a76]"}`}
                              >
                                {isSoldOut
                                  ? "Sold out"
                                  : `${event.remainingCapacity.toLocaleString()} left`}
                              </span>
                              <span className="text-[10px] text-[#4a4a52]">
                                {booked}/{event.capacity}
                              </span>
                            </div>
                            <div className="h-1 w-full rounded-full bg-[#2a2a35] overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all ${isSoldOut ? "bg-rose-500" : isAlmostFull ? "bg-amber-500" : "bg-green-500"}`}
                                style={{ width: `${fillPct}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${up ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-[#2a2a35] text-[#7c7a76] border border-[#3a3a40]"}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${up ? "bg-amber-400" : "bg-[#7c7a76]"}`}
                            />
                            {up ? "Upcoming" : "Past"}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <EditEventDialog event={event} />
                            <button
                              onClick={() => requestDelete(event)}
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
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  highlight = false,
  danger = false,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  highlight?: boolean;
  danger?: boolean;
}) {
  const borderBg = danger
    ? "border-rose-500/20 bg-rose-500/5"
    : highlight
      ? "border-amber-500/20 bg-amber-500/5"
      : "border-[#2a2a35] bg-[#16161a]";

  const iconBg = danger
    ? "bg-rose-500/20"
    : highlight
      ? "bg-amber-500/20"
      : "bg-[#1e1e24]";
  const iconColor = danger
    ? "text-rose-400"
    : highlight
      ? "text-amber-400"
      : "text-[#4a4a52]";
  const valueColor = danger
    ? "text-rose-400"
    : highlight
      ? "text-amber-400"
      : "text-[#e8e6e1]";

  return (
    <div className={`rounded-2xl border p-5 ${borderBg}`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-[#7c7a76] uppercase tracking-wider">
          {label}
        </span>
        <div
          className={`h-7 w-7 rounded-lg flex items-center justify-center ${iconBg}`}
        >
          <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
        </div>
      </div>
      <p className={`font-syne text-3xl font-bold ${valueColor}`}>{value}</p>
    </div>
  );
}
