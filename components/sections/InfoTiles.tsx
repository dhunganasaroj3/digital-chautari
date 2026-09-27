import { toIcon } from "@/lib/utils";
import { STORY } from "@/lib/data/about";

const TONES = {
  // A-1 action surface: the only teal that passes AA with white label text.
  teal: "bg-action text-on-action",
  navy: "bg-dc-navy-900 text-white",
  gold: "bg-accent-gold text-dc-navy-900",
  white: "border border-border-default bg-surface-card",
} as const;

/** 2×2 fact tiles next to the story (founded / products / HQ / team size). */
export function InfoTiles() {
  return (
    <div className="grid grid-cols-2 gap-5">
      {STORY.tiles.map((tile) => {
        const Icon = toIcon(tile.icon);
        return (
          <div key={tile.label} className={`rounded-card p-card ${TONES[tile.tone]}`}>
            <Icon className="size-5" aria-hidden />
            <p className="font-heading mt-3 text-2xl font-extrabold">{tile.value}</p>
            <p className="text-small-lg mt-1">{tile.label}</p>
          </div>
        );
      })}
    </div>
  );
}
