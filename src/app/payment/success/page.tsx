"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  Download,
  Ticket,
  CalendarDays,
  MapPin,
  Clock,
  Receipt,
  Home,
  Share2,
  Loader2,
} from "lucide-react";
import { PaymentError } from "@/components/PaymentError";

// ── Stages ─────────────────────────────────────────────────────────────────
// "verifying"  — fetching the Stripe session from your API using session_id
// "generating" — session confirmed, generating the receipt record in your DB
// "ready"      — everything done, show the receipt
type Stage = "verifying" | "generating" | "ready";

interface Booking {
  receiptId: string;
  eventTitle: string;
  date: Date;
  time: string;
  location: string;
  category: string;
  price: number;
  total: number;
  attendee: string;
  email: string;
  bookedAt: Date;
  downloadUrl: string;
  sessionId: string;
}

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const payment = searchParams.get("payment");
  const eventId = searchParams.get("eventId");
  const clerkId = searchParams.get("clerkId");

  const [stage, setStage] = useState<Stage>("verifying");
  const [error, setError] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);

  const hasCalled = useRef(false);

  const addBooking = async () => {
    const res = await fetch("/api/checkout/success", {
      method: "POST",
      body: JSON.stringify({
        sessionId,
        eventId,
        payment,
        clerkId,
      }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      setError(true);
      return;
    }
    const data = await res.json();
    setBooking(data.event);
    setStage("ready");
  };

  useEffect(() => {
    if (!sessionId) {
      router.replace("/");
      return;
    }
    let t1: any;
    if (payment === "free") {
      t1 = setTimeout(() => setStage("generating"), 4200);
    }
    return () => {
      clearTimeout(t1);
    };
  }, [sessionId, router]);

  useEffect(() => {
    if (!sessionId) return;
    if (hasCalled.current) return;
    hasCalled.current = true;
    addBooking();
  }, [sessionId]);

  useEffect(() => {
    if (payment === "free") {
      setStage("generating");
    }
  }, [payment]);

  if (error) return <PaymentError sessionId={sessionId} />;

  // ── Loading screens ───────────────────────────────────────────────────────
  if (stage === "verifying") {
    return (
      <LoadingScreen
        icon={
          <Loader2
            className="h-9 w-9 text-amber-400 animate-spin"
            style={{ animationDirection: "reverse" }}
          />
        }
        label="Verifying payment"
        sub="Confirming your transaction with Stripe…"
      />
    );
  }

  if (stage === "generating") {
    return (
      <LoadingScreen
        icon={<Receipt className="h-9 w-9 text-amber-400 animate-pulse" />}
        label="Generating receipt"
        sub="Preparing your booking confirmation and receipt…"
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f11] px-4 py-12 animate-fade-in">
      <div className="mx-auto max-w-lg">
        {/* Success icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative mb-5">
            <div className="absolute inset-0 rounded-full bg-amber-500/10 scale-150 blur-xl" />
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-500/30 bg-amber-500/10">
              <CheckCircle2 className="h-10 w-10 text-amber-400" />
            </div>
          </div>
          <h1 className="font-syne text-3xl font-bold text-[#e8e6e1] mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-sm text-[#7c7a76] max-w-xs leading-relaxed">
            Your spot is secured. A confirmation has been sent to{" "}
            <span className="text-amber-400/80">{booking?.email}</span>.
          </p>
        </div>

        {/* Receipt card */}
        <div className="rounded-2xl border border-[#2a2a35] bg-[#16161a] overflow-hidden mb-5">
          {/* Card header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#2a2a35] bg-[#0f0f11]">
            <div className="flex items-center gap-2">
              <Receipt className="h-4 w-4 text-amber-500" />
              <span className="font-syne text-sm font-semibold text-[#e8e6e1]">
                Booking Receipt
              </span>
            </div>
            <span className="text-xs font-mono text-amber-400/70">
              {booking?.receiptId}
            </span>
          </div>

          <div className="p-5 space-y-4">
            {/* Event */}
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20 shrink-0">
                <Ticket className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <p className="font-syne font-semibold text-[#e8e6e1] text-sm leading-snug">
                  {booking?.eventTitle}
                </p>
                <span className="inline-flex items-center mt-1 rounded-full bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-medium text-amber-400">
                  {booking?.category}
                </span>
              </div>
            </div>

            {/* Event details */}
            <div className="space-y-2 pt-3 border-t border-[#2a2a35]">
              <Row
                icon={CalendarDays}
                value={booking ? new Date(booking.date).toDateString() : ""}
              />
              <Row icon={Clock} value={booking?.time!} />
              <Row icon={MapPin} value={booking?.location!} />
            </div>

            {/* Attendee */}
            <div className="rounded-xl border border-[#2a2a35] bg-[#0f0f11] px-4 py-3 space-y-0.5">
              <p className="text-[10px] text-[#4a4a52] uppercase tracking-wider mb-1">
                Attendee
              </p>
              <p className="text-sm font-medium text-[#e8e6e1]">
                {booking?.attendee}
              </p>
              <p className="text-xs text-[#7c7a76]">{booking?.email}</p>
            </div>

            {/* Price breakdown */}
            <div className="space-y-2 pt-3 border-t border-[#2a2a35]">
              <div className="flex justify-between text-xs">
                <span className="text-[#7c7a76]">Ticket price</span>
                <span className="text-[#e8e6e1]">
                  KES {booking?.price.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#2a2a35]">
                <span className="font-syne text-sm font-semibold text-[#e8e6e1]">
                  Total Paid
                </span>
                <span className="font-syne text-sm font-bold text-amber-400">
                  KES {booking?.total.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-[10px] text-[#4a4a52] text-right">
              Booked on {booking ? new Date(booking.date).toDateString() : ""}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <a
            href={booking?.downloadUrl}
            download={`receipt_${booking?.downloadUrl}.pdf`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-3 text-sm font-bold text-[#0f0f11] transition-colors"
          >
            <Download className="h-4 w-4" />
            Download Receipt
          </a>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: "My EventFlow Booking",
                    text: `I'm attending ${booking?.eventTitle} on ${booking?.date}!`,
                  });
                }
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-[#2a2a35] bg-transparent px-4 py-2.5 text-xs font-medium text-[#7c7a76] hover:bg-[#1e1e24] hover:text-[#e8e6e1] transition-all"
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </button>
            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-xl border border-[#2a2a35] bg-transparent px-4 py-2.5 text-xs font-medium text-[#7c7a76] hover:bg-[#1e1e24] hover:text-[#e8e6e1] transition-all"
            >
              <Home className="h-3.5 w-3.5" />
              Browse Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Shared loading screen ──────────────────────────────────────────────────
function LoadingScreen({
  icon,
  label,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <div className="fixed inset-0 bg-[#0f0f11] flex flex-col items-center justify-center gap-6">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-amber-500/15" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 animate-spin" />
        {icon}
      </div>
      <div className="text-center space-y-2">
        <h2 className="font-syne text-xl font-bold text-[#e8e6e1]">{label}</h2>
        <p className="text-sm text-[#7c7a76] max-w-xs leading-relaxed">{sub}</p>
      </div>
      {/* Sliding shimmer bar */}
      <div className="relative w-56 h-1 rounded-full bg-[#2a2a35] overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full w-1/3 rounded-full bg-amber-500"
          style={{ animation: "slide 1.4s ease-in-out infinite" }}
        />
      </div>
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(420%);
          }
        }
      `}</style>
      <p className="text-xs text-[#4a4a52]">Please wait…</p>
    </div>
  );
}

// ── Row helper ─────────────────────────────────────────────────────────────
function Row({
  icon: Icon,
  value,
}: {
  icon: React.ElementType;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-3.5 w-3.5 text-amber-500/50 shrink-0" />
      <span className="text-xs text-[#7c7a76]">{value}</span>
    </div>
  );
}
