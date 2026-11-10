"use client";

import { useEffect, useRef, useState } from "react";
import { Dices } from "lucide-react";
import { rollDie } from "@/lib/scoring";
import { sfx } from "@/lib/utils/feedback";
import { Button } from "@/components/shared/button";
import { Die } from "./die";

const TUMBLE_MS = 900;
const SETTLE_MS = 450;

/** Tap to roll: the die tumbles, settles on the result, then reports it. */
export function DiceRoller({ teamName, onRolled }) {
  const [face, setFace] = useState(3);
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState(null);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const roll = () => {
    if (rolling || result) return;
    const value = rollDie();
    setRolling(true);
    sfx.rattle();
    const flicker = setInterval(() => setFace(1 + Math.floor(Math.random() * 6)), 90);
    timers.current.push(
      setTimeout(() => {
        clearInterval(flicker);
        setFace(value);
        setResult(value);
        setRolling(false);
      }, TUMBLE_MS),
      setTimeout(() => onRolled(value), TUMBLE_MS + SETTLE_MS),
    );
    timers.current.push(flicker);
  };

  return (
    <div className="flex flex-col items-center gap-5 text-center">
      <button
        type="button"
        onClick={roll}
        disabled={rolling || result != null}
        aria-label="Roll the die"
        className="rounded-[1.75rem] p-2 transition-transform hover:-rotate-6 focus-visible:outline-3 focus-visible:outline-sun"
      >
        <span key={rolling ? "rolling" : "still"} className={rolling ? "animate-die-tumble block" : "block"}>
          <Die value={face} size={112} />
        </span>
      </button>
      {result ? (
        <p className="font-display text-2xl font-extrabold animate-pop-in" aria-live="polite">
          {result === 6 ? "A six! 🎉" : `Rolled a ${result}!`}
        </p>
      ) : (
        <Button size="lg" variant="team" onClick={roll} disabled={rolling} className="min-w-56">
          <Dices className="size-6" />
          {rolling ? "Rolling…" : `Roll for ${teamName}`}
        </Button>
      )}
    </div>
  );
}
