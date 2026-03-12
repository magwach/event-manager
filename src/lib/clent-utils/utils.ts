import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string | Date): string {
  return new Date(dateStr).toLocaleDateString("en-KE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function isUpcoming(dateStr: string | Date): boolean {
  return new Date(dateStr) >= new Date();
}

export function getPublicIdFromUrl(url: String) {
  if (!url) return null;
  const cleanUrl = url.split("?")[0];
  const parts = cleanUrl.split("/upload/")[1];
  if (!parts) return null;

  const withoutVersion = parts.replace(/^v[0-9]+\//, "");
  return withoutVersion.replace(/\.[^/.]+$/, "");
}

export function generateReceiptId(): string {
  const year = new Date().getFullYear();

  const sequence = String(Date.now()).slice(-5);

  const suffix = Math.floor(Math.random() * 0xffff)
    .toString(16)
    .toUpperCase()
    .padStart(4, "0");

  return `RCP-${year}-${sequence}-${suffix}`;
}

export function generateSessionId(): string {
  const timestamp = Date.now().toString(36);
  const random1 = Math.random().toString(36).substring(2, 8).toUpperCase();
  const random2 = Math.random().toString(36).substring(2, 8).toUpperCase();
  const random3 = crypto
    .randomUUID()
    .replace(/-/g, "")
    .substring(0, 8)
    .toUpperCase();

  return `Free-${timestamp}-${random1}-${random2}-${random3}`;
}

export function formatMonthYear(date: Date): string {
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}

export function getMonthYearKey(dateStr: string): string {
  const date = new Date(dateStr);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}
