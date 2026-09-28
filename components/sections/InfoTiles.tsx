import { toIcon } from "@/lib/utils";
import { STORY } from "@/lib/data/about";
import { Counter } from "@/components/motion/Counter";
import { StaggerGroup } from "@/components/motion/StaggerGroup";

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
    <Counter>
      <StaggerGroup className="grid grid-cols-2 gap-5">
        {STORY.tiles.map((tile) => {
          const Icon = toIcon(tile.icon);
          const numeric = /^[\d.,]+\+?$/.test(tile.value);
          return (
            <div
              key={tile.label}
              data-reveal="scale"
              className={`rounded-card p-card ${TONES[tile.tone]}`}
            >
              <Icon className="size-5" aria-hidden />
              <p
                data-count={numeric || undefined}
                className="font-heading nav:text-2xl mt-3 min-w-0 text-xl font-extrabold"
              >
                {tile.value}
              </p>
              <p className="text-small-lg mt-1">{tile.label}</p>
            </div>
          );
        })}
      </StaggerGroup>
    </Counter>
  );
}
