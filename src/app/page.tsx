import Link from "next/link";
import { Calendar, Search, Users, Zap, ArrowRight, Tag } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0f0f11] text-[#e8e6e1]">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 mb-6">
            <Calendar className="h-3.5 w-3.5 text-amber-400" />
            <span className="text-xs font-medium text-amber-400 uppercase tracking-widest">
              EventManager
            </span>
          </div>

          <h1 className="font-syne text-5xl sm:text-6xl font-bold leading-tight text-[#e8e6e1] mb-6">
            Discover & Manage <span className="text-amber-400">Events</span>{" "}
            That Matter
          </h1>

          <p className="text-[#7c7a76] text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            EventManager is a platform for discovering, registering, and
            managing events across tech, sports, academia, and social gatherings
            — all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/events"
              className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-6 py-3 text-sm font-semibold text-[#0f0f11] transition-colors"
            >
              Browse Events
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/sign-up"
              className="flex items-center gap-2 rounded-xl border border-[#2a2a35] bg-transparent hover:bg-[#16161a] px-6 py-3 text-sm font-medium text-[#7c7a76] hover:text-[#e8e6e1] transition-all"
            >
              Create Account
            </Link>
          </div>
        </div>
      </section>

      {/* ── What We Do ───────────────────────────────────────────────── */}
      <section className="border-t border-[#2a2a35] py-20 px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="font-syne text-3xl font-bold text-[#e8e6e1] mb-3">
              Everything you need for events
            </h2>
            <p className="text-[#7c7a76] max-w-md mx-auto">
              EventManager makes it simple to find and join events happening
              around you.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <FeatureCard
              icon={Search}
              title="Discover Events"
              description="Search and filter events by category, date, or keyword to find exactly what you're looking for."
            />
            <FeatureCard
              icon={Tag}
              title="Multiple Categories"
              description="Explore events across Tech, Sports, Academic, and Social categories all in one platform."
            />
            <FeatureCard
              icon={Users}
              title="Easy Registration"
              description="Sign up for events with one click. Track your registrations and never miss an event."
            />
            <FeatureCard
              icon={Zap}
              title="Real-time Updates"
              description="Get up-to-date information on event capacity, pricing, and availability instantly."
            />
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────── */}
      <section className="border-t border-[#2a2a35] py-20 px-4 bg-[#16161a]">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-syne text-3xl font-bold text-[#e8e6e1] mb-12">
            How it works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <Step
              number="01"
              title="Create an Account"
              description="Sign up with your Google account or email in seconds."
            />
            <Step
              number="02"
              title="Browse Events"
              description="Explore upcoming events filtered by your interests and location."
            />
            <Step
              number="03"
              title="Register & Attend"
              description="Register for events, get confirmation, and show up."
            />
          </div>
        </div>
      </section>

      {/* ── Data Usage + Privacy Policy (required by Google) ─────────── */}
      <section className="border-t border-[#2a2a35] py-12 px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-syne text-xl font-bold text-[#e8e6e1] mb-3">
            How we use your Google data
          </h2>
          <p className="text-[#7c7a76] text-sm leading-relaxed max-w-xl mx-auto mb-6">
            When you sign in with Google, EventManager uses your name, email
            address, and profile picture solely to create and manage your
            account. We do not share your data with third parties or use it for
            advertising purposes.
          </p>
          {/* Prominent Privacy Policy link — required by Google verification */}
          <Link
            href="/policy"
            className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-sm font-medium text-amber-400 hover:bg-amber-500/20 transition-colors"
          >
            Read our Privacy Policy →
          </Link>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <footer className="border-t border-[#2a2a35] bg-[#0f0f11]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#4a4a52]">
            © {new Date().getFullYear()} EventManager. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/policy"
              className="text-xs text-[#4a4a52] hover:text-amber-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="text-xs text-[#4a4a52] hover:text-amber-400 transition-colors"
            >
              Terms of Service
            </Link>
            <a
              href="mailto:hello@eventmanager.space"
              className="text-xs text-[#4a4a52] hover:text-amber-400 transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-[#2a2a35] bg-[#16161a] p-5 space-y-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/20">
        <Icon className="h-5 w-5 text-amber-400" />
      </div>
      <h3 className="font-syne text-sm font-semibold text-[#e8e6e1]">
        {title}
      </h3>
      <p className="text-xs text-[#7c7a76] leading-relaxed">{description}</p>
    </div>
  );
}

function Step({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="space-y-3">
      <div className="font-syne text-3xl font-bold text-amber-500/30">
        {number}
      </div>
      <h3 className="font-syne text-base font-semibold text-[#e8e6e1]">
        {title}
      </h3>
      <p className="text-sm text-[#7c7a76] leading-relaxed">{description}</p>
    </div>
  );
}
