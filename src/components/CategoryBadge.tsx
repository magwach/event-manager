import { cn } from "@/lib/utils";
import type { Category } from "@/data/events";

const styles: Record<Category, string> = {
  Tech: "bg-blue-500/15 text-blue-400 border-blue-500/20",
  Sports: "bg-green-500/15 text-green-400 border-green-500/20",
  Academic: "bg-violet-500/15 text-violet-400 border-violet-500/20",
  Social: "bg-rose-500/15 text-rose-400 border-rose-500/20",
};

interface Props {
  category: Category;
  className?: string;
}

export function CategoryBadge({ category, className }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        styles[category],
        className
      )}
    >
      {category}
    </span>
  );
}