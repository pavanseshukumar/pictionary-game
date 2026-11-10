import { cn, formatClock } from "@/lib/utils";

/** Big circular countdown. Colour shifts and pulses in the final seconds. */
export function CountdownRing({ remainingMs, durationMs, paused }) {
  const fraction = durationMs ? remainingMs / durationMs : 0;
  const seconds = Math.ceil(remainingMs / 1000);
  const urgent = seconds <= 10 && seconds > 0;
  const done = remainingMs <= 0;
  const r = 88;
  const circumference = 2 * Math.PI * r;

  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-[min(78vw,22rem)] sm:w-[min(60vh,26rem)]",
        urgent && !paused && "animate-timer-urgent",
      )}
      role="timer"
      aria-live={urgent ? "assertive" : "off"}
      aria-label={done ? "Time’s up" : `${seconds} seconds left`}
    >
      <svg viewBox="0 0 200 200" className="size-full -rotate-90">
        <circle cx="100" cy="100" r={r + 8} fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="3" />
        <circle cx="100" cy="100" r={r} fill="none" stroke="var(--color-cream-deep)" strokeWidth="12" />
        <circle
          cx="100"
          cy="100"
          r={r}
          fill="none"
          stroke={urgent || done ? "var(--color-coral)" : "var(--team)"}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - fraction)}
          className="transition-[stroke-dashoffset] duration-200 ease-linear"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {done ? (
          <span className="font-display text-5xl font-extrabold tracking-tight text-coral sm:text-6xl animate-pop-in">
            Time’s up!
          </span>
        ) : (
          <>
            <span
              className={cn(
                "font-display text-[5.5rem] leading-none font-extrabold tracking-tighter tabular-nums sm:text-[7rem]",
                urgent && "text-coral",
              )}
            >
              {formatClock(remainingMs)}
            </span>
            <span className="mt-1 text-sm font-bold tracking-[0.18em] text-ink-muted uppercase">
              {paused ? "Paused" : "Draw!"}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
