import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import {
  changePct,
  currentPrice,
  sparkline,
  ytdHigh,
  ytdLow,
} from "@/lib/mock-analytics";
import { cn } from "@/lib/utils";

function fmt(n: number, digits = 2) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function IndexCard() {
  const positive = changePct >= 0;

  return (
    <div className="flex flex-col gap-3">
      {/* Big index card */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Index
            </span>
            <span className="rounded-sm border border-border px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              MRR
            </span>
          </div>
          <span className="text-[11px] text-muted-foreground tabular-nums">USD</span>
        </div>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="text-4xl font-bold tracking-tight tabular-nums text-foreground">
            ${fmt(currentPrice)}
          </span>
          <span className="text-xs text-muted-foreground">k</span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold tabular-nums",
              positive
                ? "bg-primary/15 text-primary"
                : "bg-destructive/15 text-destructive",
            )}
          >
            {positive ? (
              <ArrowUpRight className="size-3" />
            ) : (
              <ArrowDownRight className="size-3" />
            )}
            {positive ? "+" : ""}
            {changePct.toFixed(2)}%
          </span>
          <span className="text-[11px] text-muted-foreground">vs. yesterday</span>
        </div>

        {/* Sparkline */}
        <div className="mt-5 h-20 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkline} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <YAxis hide domain={["dataMin - 5", "dataMax + 5"]} />
              <Area
                type="monotone"
                dataKey="v"
                stroke="var(--primary)"
                strokeWidth={2}
                fill="url(#sparkFill)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Yearly performance tiles */}
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Yearly Performance
          </span>
          <span className="text-[11px] text-muted-foreground">YTD</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-surface-2 p-3">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <ArrowUpRight className="size-3 text-emerald-400" />
              YTD High
            </div>
            <div className="mt-1.5 text-lg font-semibold tabular-nums text-foreground">
              ${fmt(ytdHigh)}
            </div>
            <div className="mt-2 inline-flex rounded-sm bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-400">
              +{(((ytdHigh - currentPrice) / currentPrice) * 100).toFixed(1)}%
            </div>
          </div>
          <div className="rounded-lg bg-surface-2 p-3">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <ArrowDownRight className="size-3 text-rose-400" />
              YTD Low
            </div>
            <div className="mt-1.5 text-lg font-semibold tabular-nums text-foreground">
              ${fmt(ytdLow)}
            </div>
            <div className="mt-2 inline-flex rounded-sm bg-rose-500/15 px-1.5 py-0.5 text-[10px] font-semibold text-rose-400">
              {(((ytdLow - currentPrice) / currentPrice) * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
