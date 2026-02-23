"use client";

import { useRef, useState, useEffect } from "react";
import { toast } from "sonner";
import { Pencil, ImageIcon, X, Upload, Loader2 } from "lucide-react";
import { Category, Event } from "@/generated/prisma/client";
import { useEditEvent } from "@/hooks/use-events";

interface Props {
  event: Event;
}

const CATEGORIES: Category[] = ["Tech", "Sports", "Academic", "Social"];

export function EditEventDialog({ event }: Props) {
  const [open, setOpen] = useState(false);

  // Pre-fill form from the event being edited
  const [form, setForm] = useState({
    title: event.title,
    description: event.description,
    fullDescription: event.fullDescription,
    category: event.category as Category,
    date: event.date.toISOString().split("T")[0],
    time: event.time,
    duration: String(event.duration),
    location: event.location,
    organizer: event.organizer,
    price: String(event.price),
    capacity: String(event.capacity),
    remainingCapacity: String(event.remainingCapacity),
  });

  // Image — start from the current event image
  const [imagePreview, setImagePreview] = useState<string>(event.image);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: editEvent, isPending } = useEditEvent();

  // Re-sync form if the event prop changes (e.g. parent re-renders)
  useEffect(() => {
    if (!open) {
      setForm({
        title: event.title,
        description: event.description,
        fullDescription: event.fullDescription,
        category: event.category,
        date: event.date.toISOString().split("T")[0],
        time: event.time,
        duration: String(event.duration),
        location: event.location,
        organizer: event.organizer,
        price: String(event.price),
        capacity: String(event.capacity),
        remainingCapacity: String(event.remainingCapacity),
      });
      setImagePreview(event.image);
      setImageFile(null);
    }
  }, [event, open]);

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleClose() {
    setOpen(false);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // ── Image upload ─────────────────────────────────────────────────────────
  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB.");
      return;
    }

    setUploadingImage(true);
    setImageFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      setUploadingImage(false);
    };
    reader.onerror = () => {
      setUploadingImage(false);
      toast.error("Could not read the image. Please try again.");
    };
    reader.readAsDataURL(file);
  }

  function handleResetImage() {
    setImagePreview(event.image);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // ── Submit ───────────────────────────────────────────────────────────────
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title.trim()) return toast.error("Title is required.");
    if (!form.description.trim())
      return toast.error("Short description is required.");
    if (!form.fullDescription.trim())
      return toast.error("Full description is required.");
    if (!form.date) return toast.error("Date is required.");
    if (!form.location.trim()) return toast.error("Location is required.");
    if (!form.organizer.trim()) return toast.error("Organizer is required.");

    const price = parseInt(form.price, 10);
    const capacity = parseInt(form.capacity, 10);
    const remainingCapacity = parseInt(form.remainingCapacity, 10);

    const duration = parseInt(form.duration, 10);

    if (isNaN(duration) || duration < 1)
      return toast.error("Duration must be at least 1 minute.");
    if (isNaN(price) || price < 0)
      return toast.error("Enter a valid price (0 or more).");
    if (isNaN(capacity) || capacity < 1)
      return toast.error("Capacity must be at least 1.");
    if (remainingCapacity > capacity)
      return toast.error("Remaining capacity cannot exceed total capacity.");

    const updated: Event = {
      ...event,
      title: form.title.trim(),
      description: form.description.trim(),
      fullDescription: form.fullDescription.trim(),
      category: form.category,
      date: new Date(form.date),
      time: form.time,
      duration,
      location: form.location.trim(),
      organizer: form.organizer.trim(),
      image: imagePreview,
      price,
      capacity,
    };

    editEvent(
      {
        id: updated.id,
        title: updated.title,
        description: updated.description,
        fullDescription: updated.fullDescription,
        date: updated.date,
        category: updated.category,
        location: updated.location,
        organizer: updated.organizer,
        image: updated.image,
        time: updated.time,
        duration: updated.duration,
        price: updated.price,
        capacity: updated.capacity,
        remainingCapacity: updated.remainingCapacity,
        createdAt: updated.createdAt,
        updatedAt: updated.updatedAt,
      },
      {
        onSuccess: () => {
          toast.success("Event edited successfully");
          handleClose();
        },
        onError: () => {
          toast.error("Failed to edit Event");
        },
      },
    );
  }

  const inputClass =
    "w-full rounded-xl bg-[#0f0f11] border border-[#2a2a35] px-3 py-2.5 text-sm text-[#e8e6e1] placeholder:text-[#4a4a52] focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all";

  const labelClass =
    "text-xs font-medium text-[#7c7a76] uppercase tracking-wider";

  const bookedCount = event.capacity - event.remainingCapacity;
  const fillPct = Math.round((bookedCount / event.capacity) * 100);

  return (
    <>
      {/* Trigger — compact edit button for the table row */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#2a2a35] bg-transparent px-3 py-1.5 text-xs font-medium text-[#7c7a76] hover:bg-amber-500/10 hover:border-amber-500/30 hover:text-amber-400 transition-all"
        title="Edit event"
      >
        <Pencil className="h-3.5 w-3.5" />
        Edit
      </button>

      {open && (
        <div className="fixed top-50 inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Dialog */}
          <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-[#2a2a35] bg-[#16161a] shadow-2xl animate-fade-in flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-[#2a2a35] shrink-0">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-500/15">
                    <Pencil className="h-3.5 w-3.5 text-amber-400" />
                  </div>
                  <h2 className="font-syne text-xl font-bold text-[#e8e6e1]">
                    Edit Event
                  </h2>
                </div>
                <p className="text-sm text-[#7c7a76] truncate max-w-sm">
                  Editing:{" "}
                  <span className="text-amber-400/80 font-medium">
                    {event.title}
                  </span>
                </p>
              </div>
              <button
                onClick={handleClose}
                className="rounded-lg p-1.5 text-[#4a4a52] hover:bg-[#2a2a35] hover:text-[#e8e6e1] transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable form */}
            <form
              onSubmit={handleSubmit}
              className="overflow-y-auto px-6 py-5 space-y-5"
            >
              {/* ── Current capacity snapshot ── */}
              <div className="rounded-xl border border-[#2a2a35] bg-[#0f0f11] px-4 py-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#7c7a76]">Current fill rate</span>
                  <span
                    className={`font-semibold ${fillPct >= 90 ? "text-rose-400" : fillPct >= 60 ? "text-amber-400" : "text-green-400"}`}
                  >
                    {bookedCount} / {event.capacity} booked ({fillPct}%)
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#2a2a35] overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${fillPct >= 90 ? "bg-rose-500" : fillPct >= 60 ? "bg-amber-500" : "bg-green-500"}`}
                    style={{ width: `${fillPct}%` }}
                  />
                </div>
              </div>

              {/* Title */}
              <div className="space-y-1.5">
                <label className={labelClass}>
                  Title <span className="text-amber-500">*</span>
                </label>
                <input
                  className={inputClass}
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                />
              </div>

              {/* Short Description */}
              <div className="space-y-1.5">
                <label className={labelClass}>
                  Short Description <span className="text-amber-500">*</span>
                </label>
                <textarea
                  className={`${inputClass} resize-none h-20`}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                />
              </div>

              {/* Full Description */}
              <div className="space-y-1.5">
                <label className={labelClass}>
                  Full Description <span className="text-amber-500">*</span>
                </label>
                <textarea
                  className={`${inputClass} resize-none h-28`}
                  value={form.fullDescription}
                  onChange={(e) => set("fullDescription", e.target.value)}
                />
              </div>

              {/* Category + Date */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className={labelClass}>Category</label>
                  <select
                    className={`${inputClass} appearance-none cursor-pointer`}
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-[#0f0f11]">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>
                    Date <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="date"
                    className={inputClass}
                    value={form.date}
                    onChange={(e) => set("date", e.target.value)}
                  />
                </div>
              </div>

              {/* Start Time + Duration */}
              <div className="grid grid-cols-2 gap-3">
                {/* Start Time */}
                <div className="space-y-1.5">
                  <label className={labelClass}>Start Time</label>
                  <input
                    type="time"
                    className={inputClass}
                    value={form.time}
                    onChange={(e) => set("time", e.target.value)}
                  />
                </div>

                {/* Duration */}
                <div className="space-y-1.5">
                  <label className={labelClass}>
                    Duration (minutes) <span className="text-amber-500">*</span>
                  </label>

                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      className={`${inputClass} pr-16 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                      value={form.duration}
                      onChange={(e) => set("duration", e.target.value)}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#4a4a52] font-medium pointer-events-none">
                      mins
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-[#4a4a52] -mt-3">
                Duration example: 120 = 2 hours
              </p>

              {/* Price + Capacity + Remaining */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className={labelClass}>
                    Price (KES) <span className="text-amber-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#4a4a52] font-medium pointer-events-none">
                      KES
                    </span>
                    <input
                      type="number"
                      min="0"
                      className={`${inputClass} pl-10 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                      value={form.price}
                      onChange={(e) => set("price", e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>
                    Capacity <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    className={`${inputClass} appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                    value={form.capacity}
                    onChange={(e) => set("capacity", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>
                    Remaining <span className="text-amber-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    className={`${inputClass} cursor-not-allowed bg-gray-700`}
                    value={form.remainingCapacity}
                    disabled={true}
                  />
                </div>
              </div>
              <p className="text-[10px] text-[#4a4a52] -mt-3">
                Remaining capacity cannot exceed total capacity.
              </p>

              {/* Location + Organizer */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className={labelClass}>
                    Location <span className="text-amber-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    value={form.location}
                    onChange={(e) => set("location", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>
                    Organizer <span className="text-amber-500">*</span>
                  </label>
                  <input
                    className={inputClass}
                    value={form.organizer}
                    onChange={(e) => set("organizer", e.target.value)}
                  />
                </div>
              </div>

              {/* ── Image ── */}
              <div className="space-y-2">
                <label className={labelClass}>
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="h-3 w-3" />
                    Event Image
                  </span>
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp, image/gif"
                  className="hidden"
                  onChange={handleImageChange}
                />

                {/* Always show current/new preview */}
                <div className="relative h-36 w-full overflow-hidden rounded-xl border border-[#2a2a35] group/preview">
                  {uploadingImage ? (
                    <div className="flex h-full w-full items-center justify-center bg-[#0f0f11]">
                      <Loader2 className="h-6 w-6 text-amber-500 animate-spin" />
                    </div>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imagePreview}
                      alt="Event preview"
                      className="h-full w-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11]/70 to-transparent pointer-events-none" />

                  {/* Source label */}
                  <span className="absolute bottom-2 left-3 rounded-md bg-[#0f0f11]/80 px-2 py-0.5 text-[10px] text-[#7c7a76]">
                    {imageFile ? imageFile.name : "Current image"}
                  </span>

                  {/* Hover actions */}
                  <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex items-center gap-1 rounded-lg bg-[#0f0f11]/80 hover:bg-amber-500/20 border border-[#2a2a35] hover:border-amber-500/30 px-2 py-1 text-[10px] text-[#7c7a76] hover:text-amber-400 transition-all"
                    >
                      <Upload className="h-3 w-3" />
                      Replace
                    </button>
                    {imageFile && (
                      <button
                        type="button"
                        onClick={handleResetImage}
                        className="flex items-center gap-1 rounded-lg bg-[#0f0f11]/80 hover:bg-[#2a2a35] border border-[#2a2a35] px-2 py-1 text-[10px] text-[#7c7a76] hover:text-[#e8e6e1] transition-all"
                      >
                        <X className="h-3 w-3" />
                        Restore
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-[10px] text-[#4a4a52]">
                  Hover the image to replace it · PNG, JPG, WEBP up to 5MB
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2 pb-1">
                {/* Cancel */}
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isPending}
                  className={`flex-1 rounded-xl border border-[#2a2a35] px-4 py-2.5 text-sm font-medium transition-all
                      ${
                        isPending
                          ? "bg-[#1e1e24] text-[#4a4a52] cursor-not-allowed opacity-60"
                          : "bg-transparent text-[#7c7a76] hover:bg-[#1e1e24] hover:text-[#e8e6e1]"
                      }
                    `}
                >
                  Cancel
                </button>

                {/* Save */}
                <button
                  type="submit"
                  disabled={isPending}
                  className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold flex items-center justify-center gap-2 transition-all
                            ${
                              isPending
                                ? "bg-amber-500/70 cursor-not-allowed"
                                : "bg-amber-500 hover:bg-amber-400 active:scale-[0.98]"
                            }
                        text-[#0f0f11]
                      `}
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Pencil className="h-4 w-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
