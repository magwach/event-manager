"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import {
  Mail,
  Phone,
  CalendarDays,
  MapPin,
  Ticket,
  Shield,
  Clock,
  Receipt,
  TrendingUp,
  AlertTriangle,
  X,
  Ban,
} from "lucide-react";
import { CategoryBadge } from "@/components/CategoryBadge";
import { formatDate, isUpcoming } from "@/lib/clent-utils/utils";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGetUserProfile } from "@/hooks/use-users";
import { ProfileSkeleton } from "@/components/ProfileLoader";
import { useCancelEventBooking } from "@/hooks/use-events";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const { data: profile, isLoading } = useGetUserProfile();

  const upcomingCount =
    profile?.bookedEvents.filter((b: any) =>
      isUpcoming(b.event.date.toString()),
    ).length ?? 0;
  const bookedEvents = profile?.bookedEvents?.length ?? 0;
  const pastCount = bookedEvents - upcomingCount;
  const totalSpent =
    profile?.bookedEvents.reduce(
      (sum: number, b: any) => sum + b.event.price,
      0,
    ) ?? 0;

  const initials =
    `${profile?.firstName?.[0] ?? ""}${profile?.lastName?.[0] ?? ""}`.toUpperCase() ||
    "U";

  useEffect(() => {
    if (isLoaded && !user) {
      router.replace("/");
    }
  }, [isLoaded, user, router]);

  if (isLoading) return <ProfileSkeleton />;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="relative overflow-hidden rounded-2xl border border-[#2a2a35] bg-[#16161a] p-6 mb-8">
        {/* Decorative background glow */}
        <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-500/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-amber-500/5 blur-3xl" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Avatar */}
          <div className="relative shrink-0">
            {profile?.profileImage ? (
              <div className="relative h-20 w-20 rounded-2xl overflow-hidden ring-2 ring-amber-500/30">
                <Image
                  src={profile?.profileImage ?? ""}
                  alt={profile?.firstName ?? "User"}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 ring-2 ring-amber-500/30">
                <span className="font-syne text-2xl font-bold text-amber-400">
                  {initials}
                </span>
              </div>
            )}
            {/* Online dot */}
            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-400 border-2 border-[#16161a]" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h1 className="font-syne text-2xl font-bold text-[#e8e6e1] mb-1">
              {profile?.firstName} {profile?.lastName}
            </h1>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[#7c7a76]">
              <span className="flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-amber-500/60" />
                {profile?.email}
              </span>
              <span className="flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-amber-500/60" />
                {profile?.phone ? (
                  profile?.phone
                ) : (
                  <span className="text-[#7c7a76] italic">No phone number</span>
                )}
              </span>

              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-amber-500/60" />
                Member since{" "}
                {profile?.createdAt
                  ? new Date(profile?.createdAt).toLocaleDateString("en-KE", {
                      month: "long",
                      year: "numeric",
                    })
                  : "Unknown"}
              </span>
            </div>
          </div>

          {/* Member badge */}
          <div className="shrink-0">
            <div className="flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5">
              <Shield className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-xs font-semibold text-amber-400">
                Member
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-10">
        <StatCard
          label="Total Bookings"
          value={profile?.bookedEvents?.length ?? 0}
          icon={Ticket}
          suffix="events"
        />
        <StatCard
          label="Upcoming"
          value={upcomingCount}
          icon={TrendingUp}
          suffix="events"
          highlight
        />
        <StatCard
          label="Total Spent"
          value={`KES ${totalSpent.toLocaleString()}`}
          icon={Receipt}
          isString
        />
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ticket className="h-4 w-4 text-amber-500" />
          <h2 className="font-syne text-lg font-semibold text-[#e8e6e1]">
            Your Booked Events
          </h2>
          <span className="rounded-full bg-[#2a2a35] px-2 py-0.5 text-xs text-[#7c7a76]">
            {profile?.bookedEvents?.length ?? 0}
          </span>
        </div>
        <div className="text-xs text-[#4a4a52]">
          {pastCount} past · {upcomingCount} upcoming
        </div>
      </div>

      {profile?.bookedEvents?.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 stagger">
          {profile?.bookedEvents?.map((booking: any) => (
            <BookedEventCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  suffix,
  highlight = false,
  isString = false,
}: {
  label: string;
  value: number | string;
  icon: React.ElementType;
  suffix?: string;
  highlight?: boolean;
  isString?: boolean;
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
        className={`font-syne font-bold ${isString ? "text-xl" : "text-3xl"} ${highlight ? "text-amber-400" : "text-[#e8e6e1]"}`}
      >
        {value}
      </p>
      {suffix && <p className="text-xs text-[#4a4a52] mt-0.5">{suffix}</p>}
    </div>
  );
}

// ─── Cancel Confirmation Modal ───────────────────────────────────────────────

function CancelModal({
  isOpen,
  onClose,
  onConfirm,
  eventTitle,
  eventPrice,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  eventTitle: string;
  eventPrice: number;
}) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-md rounded-2xl border border-[#2a2a35] bg-[#16161a] shadow-2xl shadow-black/50 overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-red-600/60 via-red-500/80 to-red-600/60" />

          <div className="p-6">
            {/* Header row */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
                  <Ban className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-syne text-base font-bold text-[#e8e6e1]">
                    Cancel Booking
                  </h3>
                  <p className="text-xs text-[#4a4a52] mt-0.5">
                    This action cannot be undone
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#1e1e24] border border-[#2a2a35] text-[#4a4a52] hover:text-[#e8e6e1] hover:border-[#3a3a40] transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Event info pill */}
            <div className="mb-5 rounded-xl border border-[#2a2a35] bg-[#1e1e24] px-4 py-3">
              <p className="text-xs text-[#4a4a52] mb-1">
                Cancelling booking for
              </p>
              <p className="font-syne text-sm font-semibold text-[#e8e6e1] line-clamp-1">
                {eventTitle}
              </p>
              <p className="text-xs text-amber-400/70 mt-1">
                KES {eventPrice.toLocaleString()}
              </p>
            </div>

            {/* Warning box */}
            <div className="mb-6 flex gap-3 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3.5">
              <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-xs font-semibold text-amber-400">
                  No refund will be issued
                </p>
                <p className="text-xs text-[#7c7a76] leading-relaxed">
                  Cancelling this booking is permanent and{" "}
                  <span className="text-amber-400/80 font-medium">
                    your payment of KES {eventPrice.toLocaleString()} will not
                    be refunded.
                  </span>{" "}
                  Please make sure you want to proceed before confirming.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border border-[#2a2a35] bg-[#1e1e24] hover:border-[#3a3a40] px-4 py-2.5 text-sm font-medium text-[#7c7a76] hover:text-[#e8e6e1] transition-all"
              >
                Keep Booking
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 rounded-xl border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 px-4 py-2.5 text-sm font-semibold text-red-400 hover:text-red-300 transition-all"
              >
                Yes, Cancel It
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Booked Event Card ────────────────────────────────────────────────────────

function BookedEventCard({
  booking,
}: {
  booking: {
    id: string;
    receiptId: string;
    receipt: string;
    createdAt: Date;
    event: any;
  };
}) {
  const { event, receipt, receiptId, createdAt } = booking;
  const { user } = useUser();
  const upcoming = isUpcoming(event.date.toString());

  const { mutate, isPending } = useCancelEventBooking(
    event?.id,
    user?.id!,
    booking.id,
  );

  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancelConfirm = () => {
    mutate();
    setShowCancelModal(false);
  };

  return (
    <>
      <CancelModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelConfirm}
        eventTitle={event.title}
        eventPrice={event.price}
      />

      <div className="group flex flex-col overflow-hidden rounded-2xl border border-[#2a2a35] bg-[#16161a] card-hover">
        {/* Image */}
        <div className="relative h-40 overflow-hidden">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
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
              <span
                className={`h-1.5 w-1.5 rounded-full ${upcoming ? "bg-amber-400" : "bg-[#7c7a76]"}`}
              />
              {upcoming ? "Upcoming" : "Attended"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-4 gap-2.5">
          <CategoryBadge
            category={
              event.category as "Tech" | "Sports" | "Academic" | "Social"
            }
          />

          <h3 className="font-syne text-sm font-semibold text-[#e8e6e1] leading-snug line-clamp-2 group-hover:text-amber-400 transition-colors">
            {event.title}
          </h3>

          <div className="space-y-1 text-xs text-[#7c7a76]">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-3.5 w-3.5 text-amber-500/60 shrink-0" />
              <span>{formatDate(event.date.toString())}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-amber-500/60 shrink-0" />
              <span className="truncate">{event.location}</span>
            </div>
          </div>

          {/* Receipt + price row */}
          <div className="flex items-center justify-between pt-2 border-t border-[#2a2a35]">
            <div className="flex items-center gap-1.5 text-xs text-[#4a4a52]">
              <Receipt className="h-3 w-3" />
              <span>{receiptId}</span>
            </div>
            <span className="font-syne text-xs font-semibold text-amber-400">
              KES {event.price.toLocaleString()}
            </span>
          </div>

          {/* Booked on */}
          <p className="text-[10px] text-[#4a4a52]">
            Booked on{" "}
            {new Date(createdAt).toLocaleDateString("en-KE", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>

          <div className="mt-2 flex flex-col gap-2">
            <Link
              href={`/event/${event.id}`}
              className="flex items-center justify-center rounded-xl border border-[#2a2a35] hover:border-amber-500/30 bg-[#1e1e24] hover:bg-amber-500/10 px-3 py-2 text-xs font-medium text-[#e8e6e1] hover:text-amber-400 transition-all"
            >
              View Event Details
            </Link>

            <a
              href={receipt}
              download={`Receipt_${receiptId}.pdf`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-xl border border-[#2a2a35] hover:border-amber-500/30 bg-[#1e1e24] hover:bg-amber-500/10 px-3 py-2 text-xs font-medium text-[#e8e6e1] hover:text-amber-400 transition-all"
            >
              Download Receipt
            </a>

            {upcoming && (
              <button
                onClick={() => setShowCancelModal(true)}
                disabled={isPending}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-red-500/20 hover:border-red-500/40 bg-red-500/5 hover:bg-red-500/10 px-3 py-2 text-xs font-medium text-red-400/70 hover:text-red-400 transition-all"
              >
                <Ban className="h-3 w-3" />
                {isPending ? "Cancelling..." : "Cancel Booking"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center rounded-2xl border border-[#2a2a35] bg-[#16161a]">
      <div className="h-16 w-16 rounded-2xl bg-[#1e1e24] border border-[#2a2a35] flex items-center justify-center mb-4">
        <Ticket className="h-8 w-8 text-[#2a2a35]" />
      </div>
      <h3 className="font-syne text-lg font-semibold text-[#e8e6e1] mb-2">
        No bookings yet
      </h3>
      <p className="text-sm text-[#7c7a76] max-w-xs mb-6">
        You haven't booked any events yet. Explore what's happening and secure
        your spot.
      </p>
      <Link
        href="/"
        className="rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-2.5 text-sm font-semibold text-[#0f0f11] transition-colors"
      >
        Browse Events
      </Link>
    </div>
  );
}
