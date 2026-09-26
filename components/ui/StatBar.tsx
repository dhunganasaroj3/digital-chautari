import type { LucideIcon } from "lucide-react";
import { IconChip } from "@/components/ui/IconChip";

export type StatItem = {
  icon: LucideIcon;
  value: string;
  label: string;
};

const NAV_COLS: Record<number, string> = {
  2: "nav:grid-cols-2",
  3: "nav:grid-cols-3",
  4: "nav:grid-cols-4",
};

export function StatBar({
  items,
  className = "",
}: {
  items: readonly StatItem[];
  className?: string;
}) {
  const cols = NAV_COLS[items.length] ?? "nav:grid-cols-3";
  return (
    <div className={`rounded-card border-border-default bg-surface-card border ${className}`}>
      <div className={`grid grid-cols-1 ${cols}`}>
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`flex items-center gap-3 p-5 ${
              i > 0 ? "border-border-default nav:border-l nav:border-t-0 border-t" : ""
            }`}
          >
            <IconChip icon={item.icon} tone={i} />
            <div>
              <p className="font-heading text-2xl font-extrabold">{item.value}</p>
              <p className="text-small-lg text-text-muted">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
