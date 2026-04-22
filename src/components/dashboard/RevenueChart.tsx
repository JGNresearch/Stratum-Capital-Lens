import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
  ReferenceLine,
  Label,
} from "recharts";
import { candles, currentPrice } from "@/lib/mock-analytics";
import { cn } from "@/lib/utils";

const TIMEFRAMES = ["1D", "1W", "1M", "1Y", "All"] as const;

// Custom candle bar — render wick + body via shape callback
type CandleShapeProps = {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  payload?: {
    open: number;
    close: number;
    high: number;
    low: number;
  };
  // injected scales by recharts via Bar shape
  yAxis?: { scale: (v: number) => number };
};

function CandleShape(props: CandleShapeProps) {
  const { x = 0, width = 0, payload, yAxis } = props;
  if (!payload || !yAxis) return null;
  const { open, close, high, low } = payload;
  const up = close >= open;
  const color = up ? "var(--success)" : "var(--destructive)";
  const yHigh = yAxis.scale(high);
  const yLow = yAxis.scale(low);
  const yOpen = yAxis.scale(open);
  const yClose = yAxis.scale(close);
  const bodyTop = Math.min(yOpen, yClose);
  const bodyHeight = Math.max(1, Math.abs(yClose - yOpen));
  const cx = x + width / 2;
  const bodyW = Math.max(2, width * 0.6);
  return (
    <g>
      <line x1={cx} x2={cx} y1={yHigh} y2={yLow} stroke={color} strokeWidth={1} />
      <rect
        x={cx - bodyW / 2}
        y={bodyTop}
        width={bodyW}
        height={bodyHeight}
        fill={color}
        rx={1}
      />
    </g>
  );
}

function CustomTooltip({ active, payload }: { active?: boolean; payload?: any[] }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="rounded-md border border-border bg-popover/95 px-3 py-2 text-xs shadow-lg backdrop-blur">
      <div className="mb-1 font-medium text-foreground">{d.label}</div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 tabular-nums text-muted-foreground">
        <span>Open</span>
        <span className="text-right text-foreground">${d.open.toFixed(2)}</span>
        <span>High</span>
        <span className="text-right text-emerald-400">${d.high.toFixed(2)}</span>
        <span>Low</span>
        <span className="text-right text-rose-400">${d.low.toFixed(2)}</span>
        <span>Close</span>
        <span className="text-right text-foreground">${d.close.toFixed(2)}</span>
        <span>Volume</span>
        <span className="text-right text-foreground">{d.volume.toLocaleString()}</span>
      </div>
    </div>
  );
}

export function RevenueChart() {
  const [tf, setTf] = useState<(typeof TIMEFRAMES)[number]>("1M");
  const slice =
    tf === "1D"
      ? candles.slice(-2)
      : tf === "1W"
        ? candles.slice(-7)
        : tf === "1M"
          ? candles.slice(-30)
          : candles;

  const prices = slice.flatMap((c) => [c.high, c.low]);
  const yMin = Math.floor(Math.min(...prices) - 5);
  const yMax = Math.ceil(Math.max(...prices) + 5);

  return (
    <div className="flex h-full flex-col rounded-xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Revenue index chart</h3>
          <p className="text-xs text-muted-foreground">
            Daily open / high / low / close · signups volume
          </p>
        </div>
        <div className="flex items-center gap-1 rounded-md border border-border bg-surface p-0.5">
          {TIMEFRAMES.map((t) => (
            <button
              key={t}
              onClick={() => setTf(t)}
              className={cn(
                "rounded px-2.5 py-1 text-[11px] font-medium tabular-nums transition-colors",
                tf === t
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Candle chart */}
      <div className="mt-4 h-[260px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={slice}
            margin={{ top: 8, right: 56, left: 0, bottom: 0 }}
          >
            <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" vertical={false} />
            <XAxis
              dataKey="label"
              stroke="var(--muted-foreground)"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              minTickGap={24}
            />
            <YAxis
              orientation="right"
              domain={[yMin, yMax]}
              stroke="var(--muted-foreground)"
              tick={{ fontSize: 10 }}
              tickLine={false}
              axisLine={false}
              width={50}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--border)" }} />
            <ReferenceLine
              y={currentPrice}
              stroke="var(--primary)"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                value={`$${currentPrice.toFixed(2)}`}
                position="right"
                fill="var(--primary-foreground)"
                fontSize={10}
                fontWeight={700}
                style={{
                  background: "var(--primary)",
                }}
              />
            </ReferenceLine>
            <Bar dataKey="high" shape={<CandleShape />} isAnimationActive={false} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Volume */}
      <div className="mt-2 h-[60px] w-full border-t border-border pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={slice} margin={{ top: 0, right: 56, left: 0, bottom: 0 }}>
            <XAxis dataKey="label" hide />
            <YAxis hide />
            <Tooltip
              cursor={{ fill: "var(--surface-2)" }}
              contentStyle={{
                background: "var(--popover)",
                border: "1px solid var(--border)",
                borderRadius: 6,
                fontSize: 11,
              }}
            />
            <Bar dataKey="volume" radius={[2, 2, 0, 0]}>
              {slice.map((c, i) => (
                <Cell
                  key={i}
                  fill={c.close >= c.open ? "var(--success)" : "var(--destructive)"}
                  fillOpacity={0.45}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
