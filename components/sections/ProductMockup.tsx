import { Play } from "lucide-react";
import { chipTone } from "@/lib/utils";

type Variant = "browser" | "feed" | "phone";

/** Decorative product previews — pure CSS silhouettes, no semantics. */
export function ProductMockup({
  variant,
  className = "",
}: {
  variant: Variant;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`rounded-card border-border-default bg-surface-card border p-4 ${className}`}
    >
      {variant === "browser" ? <BrowserMock /> : variant === "feed" ? <FeedMock /> : <PhoneMock />}
    </div>
  );
}

function BrowserMock() {
  return (
    <div>
      <div className="flex gap-1.5 pb-3">
        <span className="bg-chip-3 size-3 rounded-full" />
        <span className="bg-chip-4 size-3 rounded-full" />
        <span className="bg-chip-5 size-3 rounded-full" />
      </div>
      <div className="border-border-default flex gap-3 border-t pt-3">
        <div className="flex w-1/4 flex-col gap-2">
          <div className="bg-chip-2 h-2.5 rounded" />
          <div className="bg-chip-2 h-2.5 w-3/4 rounded" />
          <div className="bg-chip-2 h-2.5 w-2/3 rounded" />
        </div>
        <div className="border-border-default flex flex-1 items-end justify-center gap-3 border-l pl-3">
          <div className="bg-action/20 h-16 w-10 rounded-t" />
          <div className="bg-action/20 h-24 w-10 rounded-t" />
          <div className="bg-action h-20 w-10 rounded-t" />
        </div>
      </div>
    </div>
  );
}

function FeedMock() {
  return (
    <div className="relative grid grid-cols-3 gap-3">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className={`rounded-chip aspect-square ${chipTone(i)}`} />
      ))}
      <div className="absolute inset-0 grid place-items-center">
        <span className="bg-surface-card/80 rounded-pill shadow-card-hover grid size-12 place-items-center">
          <Play className="text-action size-5 translate-x-0.5 fill-current" />
        </span>
      </div>
    </div>
  );
}

function PhoneMock() {
  return (
    <div className="grid place-items-center">
      <div className="border-border-default bg-surface nav:w-72 w-60 rounded-2xl border p-3">
        <div className="bg-border-default mx-auto h-1.5 w-16 rounded-full" />
        <div className="mt-3 flex flex-col gap-3">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className={`size-8 shrink-0 rounded-full ${chipTone(i + 1)}`} />
              <span className="flex-1">
                <span className="bg-border-default block h-2 w-3/4 rounded" />
                <span className="bg-border-default mt-1 block h-2 w-1/2 rounded" />
              </span>
            </div>
          ))}
        </div>
        <div className="bg-action rounded-btn mt-3 h-9" />
      </div>
    </div>
  );
}
