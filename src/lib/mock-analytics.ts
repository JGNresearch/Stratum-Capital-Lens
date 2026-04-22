export type Candle = {
  date: string; // ISO
  label: string; // axis label
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
};

// Deterministic pseudo-random series so SSR + client match
function rand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

export function generateCandles(count = 40, start = 480): Candle[] {
  const r = rand(42);
  const out: Candle[] = [];
  let prevClose = start;
  const today = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const drift = (r() - 0.45) * 14;
    const open = prevClose;
    const close = Math.max(420, open + drift);
    const high = Math.max(open, close) + r() * 6;
    const low = Math.min(open, close) - r() * 6;
    const volume = Math.round(1200 + r() * 3800);
    out.push({
      date: d.toISOString(),
      label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      open: +open.toFixed(2),
      high: +high.toFixed(2),
      low: +low.toFixed(2),
      close: +close.toFixed(2),
      volume,
    });
    prevClose = close;
  }
  return out;
}

export const candles = generateCandles(40, 480);
export const currentPrice = candles[candles.length - 1].close;
export const prevPrice = candles[candles.length - 2].close;
export const changePct = ((currentPrice - prevPrice) / prevPrice) * 100;

export const sparkline = candles.slice(-14).map((c, i) => ({ i, v: c.close }));

export const ytdHigh = Math.max(...candles.map((c) => c.high));
export const ytdLow = Math.min(...candles.map((c) => c.low));

export type Account = {
  id: number;
  name: string;
  segment: string;
  initials: string;
  color: string; // tailwind bg utility
  arr: number;
  trend: number; // %
  plan: "Enterprise" | "Business" | "Pro" | "Starter";
  share: number; // 0..100
};

export const accounts: Account[] = [
  {
    id: 1,
    name: "Acme Corporation",
    segment: "SaaS · NA",
    initials: "AC",
    color: "bg-orange-500/20 text-orange-400",
    arr: 482000,
    trend: 4.21,
    plan: "Enterprise",
    share: 12.4,
  },
  {
    id: 2,
    name: "Northwind Labs",
    segment: "Fintech · EU",
    initials: "NL",
    color: "bg-emerald-500/20 text-emerald-400",
    arr: 318500,
    trend: 2.87,
    plan: "Enterprise",
    share: 8.2,
  },
  {
    id: 3,
    name: "Globex Industries",
    segment: "Manufacturing",
    initials: "GI",
    color: "bg-sky-500/20 text-sky-400",
    arr: 264700,
    trend: -1.42,
    plan: "Business",
    share: 6.8,
  },
  {
    id: 4,
    name: "Initech Systems",
    segment: "DevTools",
    initials: "IS",
    color: "bg-violet-500/20 text-violet-400",
    arr: 219300,
    trend: 5.63,
    plan: "Business",
    share: 5.6,
  },
  {
    id: 5,
    name: "Umbrella Health",
    segment: "Healthcare",
    initials: "UH",
    color: "bg-rose-500/20 text-rose-400",
    arr: 187420,
    trend: 0.94,
    plan: "Business",
    share: 4.8,
  },
  {
    id: 6,
    name: "Hooli Cloud",
    segment: "Cloud Infra",
    initials: "HC",
    color: "bg-amber-500/20 text-amber-400",
    arr: 154890,
    trend: -2.18,
    plan: "Pro",
    share: 3.9,
  },
  {
    id: 7,
    name: "Stark Analytics",
    segment: "Data · NA",
    initials: "SA",
    color: "bg-red-500/20 text-red-400",
    arr: 132450,
    trend: 6.07,
    plan: "Pro",
    share: 3.4,
  },
  {
    id: 8,
    name: "Wayne Logistics",
    segment: "Supply Chain",
    initials: "WL",
    color: "bg-slate-500/20 text-slate-300",
    arr: 98600,
    trend: 1.32,
    plan: "Pro",
    share: 2.5,
  },
  {
    id: 9,
    name: "Vandelay Imports",
    segment: "Retail · APAC",
    initials: "VI",
    color: "bg-teal-500/20 text-teal-400",
    arr: 74200,
    trend: -0.61,
    plan: "Starter",
    share: 1.9,
  },
];
