"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Calendar } from "lucide-react";
import { EventCard } from "@/components/EventCard";
import type { Category } from "@/data/events";
import { useGetAllEvents } from "@/hooks/use-events";
import { EventCardSkeleton } from "@/components/EventCardSkeleton";
import Link from "next/link";
import { formatMonthYear, getMonthYearKey } from "@/lib/clent-utils/utils";

const CATEGORIES: Array<{ value: string; label: string }> = [
  { value: "all", label: "All Categories" },
  { value: "Tech", label: "Tech" },
  { value: "Sports", label: "Sports" },
  { value: "Academic", label: "Academic" },
  { value: "Social", label: "Social" },
];


export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [monthFilter, setMonthFilter] = useState("all");

  const { data: events = [], isLoading } = useGetAllEvents();

  const monthOptions = useMemo(() => {
    const seen = new Set<string>();
    const options: Array<{ value: string; label: string }> = [];

    events.forEach((event: any) => {
      const key = getMonthYearKey(event.date);
      if (!seen.has(key)) {
        seen.add(key);
        const date = new Date(event.date);
        options.push({ value: key, label: formatMonthYear(date) });
      }
    });

    // Sort descending (most recent first)
    options.sort((a, b) => b.value.localeCompare(a.value));

    return [{ value: "all", label: "All Months" }, ...options];
  }, [events]);

  const filtered = useMemo(() => {
    return events?.filter((event: any) => {
      const matchSearch = event?.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchCategory =
        category === "all" || event?.category === (category as Category);
      const matchMonth =
        monthFilter === "all" || getMonthYearKey(event.date) === monthFilter;
      return matchSearch && matchCategory && matchMonth;
    });
  }, [search, category, monthFilter, events]);

  const selectClass =
    "rounded-xl border border-[#2a2a35] bg-[#16161a] px-3 py-2.5 text-sm text-[#e8e6e1] focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all appearance-none cursor-pointer pr-8";

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Header */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-amber-500" />
            <span className="text-xs font-medium text-amber-500 uppercase tracking-widest">
              Events
            </span>
          </div>
          <h1 className="font-syne text-4xl sm:text-5xl font-800 leading-tight text-[#e8e6e1] mb-3">
            Discover What's <span className="text-amber-400">Happening</span>
          </h1>
          <p className="text-[#7c7a76] text-lg max-w-xl">
            Browse, filter, and register for events across tech, sports,
            academia, and social gatherings.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-3 p-4 rounded-2xl border border-[#2a2a35] bg-[#16161a] animate-fade-in">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4a4a52]" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#2a2a35] bg-[#0f0f11] pl-9 pr-4 py-2.5 text-sm text-[#e8e6e1] placeholder:text-[#4a4a52] focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
            />
          </div>

          {/* Category filter */}
          <div className="relative">
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4a4a52] pointer-events-none" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`${selectClass} pl-9`}
            >
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value} className="bg-[#16161a]">
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Month/Year filter */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4a4a52] pointer-events-none" />
            <select
              value={monthFilter}
              onChange={(e) => setMonthFilter(e.target.value)}
              className={`${selectClass} pl-9`}
            >
              {monthOptions.map((m) => (
                <option key={m.value} value={m.value} className="bg-[#16161a]">
                  {m.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results count */}
        <p className="mb-6 text-sm text-[#7c7a76]">
          Showing{" "}
          <span className="font-semibold text-amber-400">
            {filtered.length}
          </span>{" "}
          {filtered.length === 1 ? "event" : "events"}
          {search && ` for "${search}"`}
        </p>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 stagger">
            {filtered.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in">
            <div className="h-16 w-16 rounded-2xl bg-[#16161a] border border-[#2a2a35] flex items-center justify-center mb-4">
              <Calendar className="h-8 w-8 text-[#4a4a52]" />
            </div>
            <h3 className="font-syne text-lg font-semibold text-[#e8e6e1] mb-2">
              No events found
            </h3>
            <p className="text-sm text-[#7c7a76]">
              Try adjusting your filters or search term.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setCategory("all");
                setMonthFilter("all");
              }}
              className="mt-4 rounded-xl border border-[#2a2a35] px-4 py-2 text-sm text-[#7c7a76] hover:bg-[#16161a] hover:text-[#e8e6e1] transition-all"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
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