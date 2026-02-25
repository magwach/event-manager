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