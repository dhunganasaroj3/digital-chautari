import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/Card";

/** Pure-CSS stand-in for the future embedded map. Decorative parts are aria-hidden. */
export function MapPlaceholder() {
  return (
    <Card hover={false} className="overflow-hidden">
      <div aria-hidden className="ratio-blog bg-chip-2 rounded-card relative overflow-hidden">
        <span className="bg-border-default absolute top-[22%] left-0 h-1 w-full -rotate-6 rounded" />
        <span className="bg-border-default absolute top-[55%] left-0 h-1 w-full rotate-3 rounded" />
        <span className="bg-border-default absolute top-[38%] left-0 h-1 w-full -rotate-2 rounded" />
        <div className="absolute inset-0 grid place-items-center">
          <MapPin className="text-action size-8" />
        </div>
      </div>
      <p className="text-small text-text-muted mt-3">Kathmandu, Nepal · map coming soon</p>
    </Card>
  );
}
