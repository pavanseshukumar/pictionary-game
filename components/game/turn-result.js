import { Check, X } from "lucide-react";
import { teamStyle } from "@/data/team-colors";
import { teamById } from "@/lib/game-engine/engine";
import { formatSeconds } from "@/lib/utils";
import { CategoryBadge } from "@/components/shared/category-badge";

/** Banner after a turn: reveals the word to the room and who scored. */
export function TurnResult({ session }) {
  const turn = session.currentTurn;
  if (!turn?.result) return null;
  const success = turn.result === "correct";
  const scorer = teamById(session, turn.scoringTeamId);
  const drawingTeam = teamById(session, turn.teamId);
  const steal = success && scorer && scorer.id !== drawingTeam.id;

  return (
    <section
      className="card-ink overflow-hidden animate-pop-in"
      style={teamStyle((scorer ?? drawingTeam).color)}
      aria-live="polite"
    >
      <div className={`flex items-center gap-3 px-5 py-3 ${success ? "bg-[var(--team)] text-[var(--team-fg)]" : "bg-cream-deep"}`}>
        <span
          className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full border-2 border-ink ${success ? "bg-paper text-mint" : "bg-paper text-coral"}`}
        >
          {success ? <Check className="size-5" strokeWidth={4} /> : <X className="size-5" strokeWidth={4} />}
        </span>
        <p className="min-w-0 flex-1 font-display text-lg leading-tight font-extrabold">
          {success
            ? steal
              ? `${scorer.name} stole it!`
              : `${scorer.name} got it${turn.timeUsedMs != null ? ` in ${formatSeconds(turn.timeUsedMs)}` : ""}!`
            : turn.isAllPlay
              ? "Nobody cracked it"
              : `So close, ${drawingTeam.name}`}
        </p>
        {success && turn.points > 0 && (
          <span className="rounded-full bg-paper px-3 py-1 font-display text-lg font-extrabold text-ink">
            +{turn.points}
          </span>
        )}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <div>
          <p className="text-xs font-bold tracking-wider text-ink-muted uppercase">The word was</p>
          <p className="font-display text-3xl font-extrabold tracking-tight">{turn.word.text}</p>
        </div>
        <CategoryBadge category={turn.category} size="sm" />
      </div>
    </section>
  );
}
