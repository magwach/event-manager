"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import type { Event, Category } from "@/data/events";

interface Props {
  onAdd: (event: Event) => void;
}

const CATEGORIES: Category[] = ["Tech", "Sports", "Academic", "Social"];

export function AddEventDialog({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Tech" as Category,
    date: "",
    location: "",
    organizer: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title || !form.date || !form.description) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const newEvent: Event = {
      id: `evt-${Date.now()}`,
      ...form,
      time: "TBD",
      fullDescription: form.description,
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    };

    onAdd(newEvent);
    toast.success("Event added successfully 🎉");
    setOpen(false);
    setForm({ title: "", description: "", category: "Tech", date: "", location: "", organizer: "" });
  }

  const inputClass =
    "w-full rounded-xl bg-[#0f0f11] border border-[#2a2a35] px-3 py-2.5 text-sm text-[#e8e6e1] placeholder:text-[#4a4a52] focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all";

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-2.5 text-sm font-semibold text-[#0f0f11] transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add Event
      </button>

      {/* Backdrop + Dialog */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Dialog */}
          <div className="relative z-10 w-full max-w-lg rounded-2xl border border-[#2a2a35] bg-[#16161a] p-6 shadow-2xl animate-fade-in">
            <div className="mb-6">
              <h2 className="font-syne text-xl font-bold text-[#e8e6e1]">Add New Event</h2>
              <p className="mt-1 text-sm text-[#7c7a76]">Fill in the details to create a new event.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#7c7a76] uppercase tracking-wider">
                  Title <span className="text-amber-500">*</span>
                </label>
                <input
                  className={inputClass}
                  placeholder="e.g. Web Dev Conference 2025"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#7c7a76] uppercase tracking-wider">
                  Description <span className="text-amber-500">*</span>
                </label>
                <textarea
                  className={`${inputClass} resize-none h-24`}
                  placeholder="Short description of the event..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                />
              </div>

              {/* Category + Date row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#7c7a76] uppercase tracking-wider">
                    Category
                  </label>
                  <select
                    className={`${inputClass} appearance-none cursor-pointer`}
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value as Category })}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-[#0f0f11]">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[#7c7a76] uppercase tracking-wider">
                    Date <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="date"
                    className={`${inputClass} color-scheme-dark`}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                  />
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#7c7a76] uppercase tracking-wider">
                  Location
                </label>
                <input
                  className={inputClass}
                  placeholder="e.g. Nairobi Garage, Westlands"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                />
              </div>

              {/* Organizer */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-[#7c7a76] uppercase tracking-wider">
                  Organizer
                </label>
                <input
                  className={inputClass}
                  placeholder="e.g. DevKE Community"
                  value={form.organizer}
                  onChange={(e) => setForm({ ...form, organizer: e.target.value })}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-xl border border-[#2a2a35] bg-transparent px-4 py-2.5 text-sm font-medium text-[#7c7a76] hover:bg-[#1e1e24] hover:text-[#e8e6e1] transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-amber-500 hover:bg-amber-400 px-4 py-2.5 text-sm font-semibold text-[#0f0f11] transition-colors"
                >
                  Add Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}