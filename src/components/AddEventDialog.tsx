"use client";

import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { Plus, ImageIcon, X, Upload, Loader2 } from "lucide-react";
import { Category } from "@/generated/prisma/client";
import { useAddEvent } from "@/hooks/use-events";

const CATEGORIES: Category[] = ["Tech", "Sports", "Academic", "Social"];

const DEFAULT_FORM = {
  title: "",
  description: "",
  fullDescription: "",
  category: "Tech" as Category,
  date: "",
  time: "",
  duration: "",
  location: "",
  organizer: "",
  price: "",
  capacity: "",
};

export function AddEventDialog() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(DEFAULT_FORM);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: addEvent, isPending } = useAddEvent();

  function set(field: keyof typeof DEFAULT_FORM, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleClose() {
    setOpen(false);
    setForm(DEFAULT_FORM);
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

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

  function handleRemoveImage() {
    setImagePreview(null);
    setImageFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.title.trim()) return toast.error("Title is required.");
    if (!form.description.trim())
      return toast.error("Short description is required.");
    if (!form.fullDescription.trim())
      return toast.error("Full description is required.");
    if (!form.date) return toast.error("Date is required.");
    if (!form.time) return toast.error("Start time is required.");
    if (!form.location.trim()) return toast.error("Location is required.");
    if (!form.organizer.trim()) return toast.error("Organizer is required.");
    if (!imagePreview) return toast.error("Please upload an event image.");
    if (!form.duration) return toast.error("Duration is required.");

    const duration = parseInt(form.duration, 10);
    if (isNaN(duration) || duration < 1)
      return toast.error("Duration must be at least 1 minute.");

    const price = parseInt(form.price, 10);
    const capacity = parseInt(form.capacity, 10);

    if (!form.price || isNaN(price) || price < 0)
      return toast.error("Enter a valid price (0 or more).");
    if (!form.capacity || isNaN(capacity) || capacity < 1)
      return toast.error("Capacity must be at least 1.");

    const newEvent: any = {
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
      remainingCapacity: capacity,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    addEvent(
      {
        title: newEvent.title,
        description: newEvent.description,
        fullDescription: newEvent.fullDescription,
        date: newEvent.date,
        category: newEvent.category,
        location: newEvent.location,
        organizer: newEvent.organizer,
        image: newEvent.image,
        time: newEvent.time,
        duration: newEvent.duration,
        price: newEvent.price,
        capacity: newEvent.capacity,
        remainingCapacity: newEvent.remainingCapacity,
        createdAt: newEvent.createdAt,
        updatedAt: newEvent.updatedAt,
      },
      {
        onSuccess: () => {
          toast.success("Event added successfully");
          handleClose();
        },
        onError: () => {
          toast.error("Failed to add Event");
        },
      },
    );
  }

  const inputClass =
    "w-full rounded-xl bg-[#0f0f11] border border-[#2a2a35] px-3 py-2.5 text-sm text-[#e8e6e1] placeholder:text-[#4a4a52] focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all";

  const labelClass =
    "text-xs font-medium text-[#7c7a76] uppercase tracking-wider";

  const modal = open ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal shell */}
      <div className="relative z-10 flex flex-col w-full max-w-2xl max-h-[90vh] rounded-2xl border border-[#2a2a35] bg-[#16161a] shadow-2xl animate-fade-in overflow-hidden">
        {/* Fixed Header */}
        <div className="flex items-start justify-between px-6 pt-6 pb-4 border-b border-[#2a2a35] shrink-0">
          <div>
            <h2 className="font-syne text-xl font-bold text-[#e8e6e1]">
              Add New Event
            </h2>
            <p className="mt-1 text-sm text-[#7c7a76]">
              Fill in all details to publish a new event.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 text-[#4a4a52] hover:bg-[#2a2a35] hover:text-[#e8e6e1] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto px-6 py-5 space-y-5"
        >
          {/* Title */}
          <div className="space-y-1.5">
            <label className={labelClass}>
              Title <span className="text-amber-500">*</span>
            </label>
            <input
              className={inputClass}
              placeholder="e.g. Web Dev Conference 2025"
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
              placeholder="One or two sentences shown on the event card..."
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
              placeholder="Detailed description shown on the event details page..."
              value={form.fullDescription}
              onChange={(e) => set("fullDescription", e.target.value)}
            />
          </div>

          {/* Category + Date + Time */}
          <div className="grid grid-cols-3 gap-3">
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

            <div className="space-y-1.5">
              <label className={labelClass}>
                Start Time <span className="text-amber-500">*</span>
              </label>
              <input
                type="time"
                className={inputClass}
                value={form.time}
                onChange={(e) => set("time", e.target.value)}
              />
            </div>
          </div>

          <p className="text-[10px] text-[#4a4a52] -mt-3">
            Time is stored as a full DateTime — date and time are combined on
            submit.
          </p>

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
                placeholder="e.g. 120"
                value={form.duration}
                onChange={(e) => set("duration", e.target.value)}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#4a4a52] font-medium pointer-events-none">
                mins
              </span>
            </div>
            <p className="text-[10px] text-[#4a4a52]">
              Total event length (e.g. 90 for 1h 30m)
            </p>
          </div>

          {/* Price + Capacity */}
          <div className="grid grid-cols-2 gap-3">
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
                  placeholder="0"
                  value={form.price}
                  onChange={(e) => set("price", e.target.value)}
                />
              </div>
              <p className="text-[10px] text-[#4a4a52]">
                Enter 0 for free events
              </p>
            </div>

            <div className="space-y-1.5">
              <label className={labelClass}>
                Capacity <span className="text-amber-500">*</span>
              </label>
              <input
                type="number"
                min="1"
                className={`${inputClass} appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                placeholder="e.g. 200"
                value={form.capacity}
                onChange={(e) => set("capacity", e.target.value)}
              />
              <p className="text-[10px] text-[#4a4a52]">
                Max attendees · remaining capacity starts at full
              </p>
            </div>
          </div>

          {/* Location + Organizer */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className={labelClass}>
                Location <span className="text-amber-500">*</span>
              </label>
              <input
                className={inputClass}
                placeholder="e.g. Nairobi Garage, Westlands"
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
                placeholder="e.g. DevKE Community"
                value={form.organizer}
                onChange={(e) => set("organizer", e.target.value)}
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <label className={labelClass}>
              <span className="flex items-center gap-1.5">
                <ImageIcon className="h-3 w-3" />
                Event Image
                <span className="normal-case text-[#4a4a52] font-normal">
                  (optional)
                </span>
              </span>
            </label>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp, image/gif"
              className="hidden"
              onChange={handleImageChange}
            />

            {imagePreview ? (
              <div className="relative h-36 w-full overflow-hidden rounded-xl border border-[#2a2a35] group/preview">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePreview}
                  alt="Event image preview"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f11]/70 to-transparent pointer-events-none" />
                <span className="absolute bottom-2 left-3 rounded-md bg-[#0f0f11]/80 px-2 py-0.5 text-[10px] text-[#7c7a76] max-w-[65%] truncate">
                  {imageFile?.name}
                </span>
                <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1 rounded-lg bg-[#0f0f11]/80 hover:bg-amber-500/20 border border-[#2a2a35] hover:border-amber-500/30 px-2 py-1 text-[10px] text-[#7c7a76] hover:text-amber-400 transition-all"
                  >
                    <Upload className="h-3 w-3" />
                    Replace
                  </button>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="flex items-center gap-1 rounded-lg bg-[#0f0f11]/80 hover:bg-rose-500/10 border border-[#2a2a35] hover:border-rose-500/30 px-2 py-1 text-[10px] text-[#7c7a76] hover:text-rose-400 transition-all"
                  >
                    <X className="h-3 w-3" />
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingImage}
                className="w-full rounded-xl border-2 border-dashed border-[#2a2a35] hover:border-amber-500/40 bg-[#0f0f11] hover:bg-amber-500/5 transition-all group/drop flex flex-col items-center justify-center gap-3 py-9 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {uploadingImage ? (
                  <>
                    <Loader2 className="h-6 w-6 text-amber-500 animate-spin" />
                    <span className="text-xs text-[#7c7a76]">
                      Reading image...
                    </span>
                  </>
                ) : (
                  <>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1e1e24] border border-[#2a2a35] group-hover/drop:border-amber-500/30 group-hover/drop:bg-amber-500/10 transition-all">
                      <Upload className="h-5 w-5 text-[#4a4a52] group-hover/drop:text-amber-400 transition-colors" />
                    </div>
                    <div className="text-center space-y-0.5">
                      <p className="text-sm font-medium text-[#7c7a76] group-hover/drop:text-amber-400 transition-colors">
                        Click to upload an image
                      </p>
                      <p className="text-xs text-[#4a4a52]">
                        PNG, JPG, WEBP up to 5MB
                      </p>
                      <p className="text-[10px] text-[#4a4a52]">
                        A default image is used if skipped
                      </p>
                    </div>
                  </>
                )}
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2 pb-1">
            <button
              type="button"
              onClick={handleClose}
              disabled={isPending}
              className="flex-1 rounded-xl border border-[#2a2a35] bg-transparent px-4 py-2.5 text-sm font-medium text-[#7c7a76] hover:bg-[#1e1e24] hover:text-[#e8e6e1] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-xl bg-amber-500 hover:bg-amber-400 px-4 py-2.5 text-sm font-semibold text-[#0f0f11] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending && (
                <span className="h-4 w-4 border-2 border-[#0f0f11] border-t-transparent rounded-full animate-spin" />
              )}
              {isPending ? "Adding..." : "Add Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-2.5 text-sm font-semibold text-[#0f0f11] transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add Event
      </button>

      {/* Portal — renders directly into document.body, escaping any transform/stacking context */}
      {typeof window !== "undefined" && createPortal(modal, document.body)}
    </>
  );
}
