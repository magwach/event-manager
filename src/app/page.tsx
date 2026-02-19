"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Calendar } from "lucide-react";
import { EVENTS } from "@/data/events";
import { EventCard } from "@/components/EventCard";
import { isUpcoming } from "@/lib/utils";
import type { Category } from "@/data/events";

type DateFilter = "all" | "upcoming" | "past";

const CATEGORIES: Array<{ value: string; label: string }> = [
  { value: "all", label: "All Categories" },
  { value: "Tech", label: "Tech" },
  { value: "Sports", label: "Sports" },
  { value: "Academic", label: "Academic" },
  { value: "Social", label: "Social" },
];

const DATE_FILTERS: Array<{ value: DateFilter; label: string }> = [
  { value: "all", label: "All Dates" },
  { value: "upcoming", label: "Upcoming" },
  { value: "past", label: "Past" },
];

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [dateFilter, setDateFilter] = useState<DateFilter>("all");

  const filtered = useMemo(() => {
    return EVENTS.filter((event : any) => {
      const matchSearch = event.title.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "all" || event.category === (category as Category);
      const matchDate =
        dateFilter === "all" ||
        (dateFilter === "upcoming" && isUpcoming(event.date)) ||
        (dateFilter === "past" && !isUpcoming(event.date));
      return matchSearch && matchCategory && matchDate;
    });
  }, [search, category, dateFilter]);

  const selectClass =
    "rounded-xl border border-[#2a2a35] bg-[#16161a] px-3 py-2.5 text-sm text-[#e8e6e1] focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all appearance-none cursor-pointer pr-8";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Header */}
      <div className="mb-12 animate-fade-in">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="h-5 w-5 text-amber-500" />
          <span className="text-xs font-medium text-amber-500 uppercase tracking-widest">Events</span>
        </div>
        <h1 className="font-syne text-4xl sm:text-5xl font-800 leading-tight text-[#e8e6e1] mb-3">
          Discover What&apos;s{" "}
          <span className="text-amber-400">Happening</span>
        </h1>
        <p className="text-[#7c7a76] text-lg max-w-xl">
          Browse, filter, and register for events across tech, sports, academia, and social gatherings.
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

        {/* Date filter */}
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#4a4a52] pointer-events-none" />
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as DateFilter)}
            className={`${selectClass} pl-9`}
          >
            {DATE_FILTERS.map((d) => (
              <option key={d.value} value={d.value} className="bg-[#16161a]">
                {d.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="mb-6 text-sm text-[#7c7a76]">
        Showing{" "}
        <span className="font-semibold text-amber-400">{filtered.length}</span>{" "}
        {filtered.length === 1 ? "event" : "events"}
        {search && ` for "${search}"`}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
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
          <h3 className="font-syne text-lg font-semibold text-[#e8e6e1] mb-2">No events found</h3>
          <p className="text-sm text-[#7c7a76]">
            Try adjusting your filters or search term.
          </p>
          <button
            onClick={() => { setSearch(""); setCategory("all"); setDateFilter("all"); }}
            className="mt-4 rounded-xl border border-[#2a2a35] px-4 py-2 text-sm text-[#7c7a76] hover:bg-[#16161a] hover:text-[#e8e6e1] transition-all"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}