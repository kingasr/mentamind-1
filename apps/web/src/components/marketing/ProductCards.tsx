/* Small product "moments" rendered as cards. Shared by the landing hero and
   the auth pages so both show the same picture of the product. */

export const SIGNAL_ROWS = [
  { team: "Design", status: "Low", tone: "#5fd38d" },
  { team: "Platform", status: "Watch", tone: "#ffc857" },
  { team: "Sales", status: "Low", tone: "#5fd38d" },
  { team: "Support", status: "Rising", tone: "#ff7d6b" },
];

const cardBase =
  "shrink-0 w-[200px] h-[210px] rounded-2xl p-4 flex flex-col justify-between shadow-[0_24px_60px_-20px_rgba(2,30,45,0.55)]";
const cardLight = `${cardBase} bg-[#f3f5f8] text-[#0a0c10]`;
const cardDark = `${cardBase} bg-[#0e1218] text-white ring-1 ring-white/10`;
const mono = "font-mono text-[10px] uppercase tracking-[0.14em]";

export function CheckinCard() {
  return (
    <div className={cardLight}>
      <div className={`${mono} text-[#0a0c10]/55`}>Today&apos;s check-in</div>
      <div>
        <div className="font-geist text-[40px] leading-none tracking-tight">
          4<span className="text-[#0a0c10]/35">/5</span>
        </div>
        <div className="mt-2 text-xs text-[#0a0c10]/60">Mood · Energy 3 · Stress 2</div>
      </div>
      <div className="flex items-center gap-1.5 text-[11px] text-[#0a0c10]/55">
        <span className="h-1.5 w-1.5 rounded-full bg-[#22a45d]" /> Saved 8:41 AM
      </div>
    </div>
  );
}

export function MeditationCard() {
  return (
    <div className={cardLight}>
      <div className={`${mono} text-[#0a0c10]/55`}>Day 12 of 30</div>
      <div>
        <div className="font-geist text-[19px] font-medium leading-tight tracking-tight">Breathing for focus</div>
        <div className="mt-1.5 text-xs text-[#0a0c10]/60">10 min · Foundation block</div>
      </div>
      <div className="h-1.5 w-full rounded-full bg-[#0a0c10]/10">
        <div className="h-full w-[40%] rounded-full bg-[#19b2d2]" />
      </div>
    </div>
  );
}

export function CoachCard() {
  return (
    <div className={cardDark}>
      <div className={`${mono} text-white/45`}>AI companion</div>
      <p className="font-geist text-[14px] leading-snug text-white/90">
        Sounds like the deadline is weighing on you. Want a two-minute reset before standup?
      </p>
      <div className={`${mono} text-white/35`}>Private · Never shared</div>
    </div>
  );
}

export function SignalCard() {
  return (
    <div className={cardLight}>
      <div className={`${mono} text-[#0a0c10]/55`}>Team signal · This week</div>
      <div className="space-y-1.5">
        {SIGNAL_ROWS.slice(0, 3).map((row) => (
          <div key={row.team} className="flex items-center justify-between text-xs">
            <span className="text-[#0a0c10]/70">{row.team}</span>
            <span
              className="rounded-full px-2 py-0.5 text-[11px] font-medium"
              style={{ background: `${row.tone}33`, color: "#0a0c10" }}
            >
              {row.status}
            </span>
          </div>
        ))}
      </div>
      <div className="text-[11px] text-[#0a0c10]/55">No individual entries</div>
    </div>
  );
}

export function ForumCard() {
  return (
    <div className={cardLight}>
      <div className={`${mono} text-[#0a0c10]/55`}>Forum · Anonymous</div>
      <p className="font-geist text-[15px] leading-snug tracking-tight">&ldquo;Anyone else finding this week rough?&rdquo;</p>
      <div className="text-[11px] text-[#0a0c10]/55">14 replies · 2h ago</div>
    </div>
  );
}
