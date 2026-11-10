"use client";

import { EyeOff, Smartphone, Users } from "lucide-react";
import { teamStyle } from "@/data/team-colors";
import { activeTeam } from "@/lib/game-engine/engine";
import { gameActions } from "@/lib/store/game-store";
import { sfx } from "@/lib/utils/feedback";
import { Button } from "@/components/shared/button";
import { CategoryBadge } from "@/components/shared/category-badge";

/** Between turns: announce who's up and get the device to the drawer privately. */
export function HandoffScreen({ session }) {
  const team = activeTeam(session);
  const turn = session.currentTurn;
  const drawer = turn.drawerName;
  const space = session.board?.[team.position];

  return (
    <div className="flex flex-1 flex-col gap-6" style={teamStyle(team.color)}>
      <section className="relative overflow-hidden rounded-[2rem] border-2 border-ink bg-[var(--team)] px-6 pt-8 pb-10 text-center text-[var(--team-fg)] shadow-[0_6px_0_0_var(--color-ink)] animate-pop-in">
        <Scribbles />
        <p className="relative font-display text-sm font-bold tracking-[0.16em] uppercase opacity-85">
          Turn {turn.number}
          {space && space.index > 0 && ` · space ${space.index}`}
        </p>
        <h1 className="relative mt-2 font-display text-[2.6rem] leading-none font-extrabold tracking-tight text-balance sm:text-6xl">
          {team.name}
        </h1>
        <p className="relative mt-3 text-lg font-semibold opacity-90">you’re up!</p>
        <div className="relative mt-6 flex justify-center">
          <CategoryBadge category={turn.category} size="lg" className="border-2 border-ink shadow-[0_3px_0_0_var(--color-ink)]" />
        </div>
      </section>

      {turn.isAllPlay && (
        <div className="flex items-start gap-3 rounded-2xl border-2 border-ink bg-sun-soft p-4 animate-rise">
          <Users className="mt-0.5 size-6 shrink-0" />
          <p>
            <span className="font-display text-lg font-extrabold">All Play!</span>{" "}
            <span className="text-ink-soft">
              {drawer} draws, but <strong>every team</strong> guesses. First team to shout the answer takes the point
              {session.mode === "classic" ? " and the roll" : ""}.
            </span>
          </p>
        </div>
      )}

      <section className="card-ink flex flex-col items-center gap-4 p-6 text-center animate-rise [animation-delay:120ms]">
        <span className="inline-flex size-16 items-center justify-center rounded-full bg-cream-deep">
          <Smartphone className="size-8" />
        </span>
        <div>
          <p className="text-sm font-bold tracking-wider text-ink-muted uppercase">Drawing this turn</p>
          <p className="font-display text-3xl font-extrabold tracking-tight">{drawer}</p>
        </div>
        <p className="max-w-sm text-ink-soft">
          Pass the phone to <strong className="text-ink">{drawer}</strong>. Everyone else — eyes off the screen until
          the timer starts.
        </p>
      </section>

      <div className="mt-auto flex flex-col gap-2">
        <p className="text-center text-sm font-semibold text-ink-soft">{drawer} only — tap when you’re holding the phone</p>
        <Button
          size="xl"
          variant="team"
          block
          onClick={() => {
            sfx.unlock();
            gameActions.openReveal();
          }}
        >
          <EyeOff className="size-6" />
          Show me the word
        </Button>
      </div>
    </div>
  );
}

function Scribbles() {
  return (
    <svg aria-hidden viewBox="0 0 400 220" className="absolute inset-0 size-full opacity-20" preserveAspectRatio="none">
      <path d="M-10 40 C 60 10, 90 80, 150 40 S 260 0, 300 50" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="350" cy="170" r="34" stroke="currentColor" strokeWidth="6" fill="none" />
      <path d="M30 190 l20 -20 l20 20 l20 -20 l20 20" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
