
# SaaS Analytics Dashboard — Pixel-Faithful Style of Screenshot

A near pixel-faithful recreation of the screenshot's visual language (dark canvas, warm orange accent, dense card layout, candlestick + table composition), reskinned to a **SaaS product analytics** domain instead of crypto.

## Domain swap

| Screenshot (crypto) | This build (SaaS analytics) |
|---|---|
| CMC 100 index price | MRR (Monthly Recurring Revenue) |
| Yearly high/low ranges | YTD high / YTD low MRR |
| Candlestick OHLC chart | Daily revenue candles (open/high/low/close per day) + signups volume bars |
| Market Rates 100 Constituents | Top Customer Accounts table |
| Coin · Price · Trend · Market Rate · Weight | Account · ARR · Trend · Plan · Share of revenue |

## Layout (matches screenshot 1:1)

```text
┌──────┬──────────────────────────────────────────────────────────┐
│      │  ☰  Eman Pixel · PRO    [search]      [Settings] update  │
│ Side ├──────────────────────────────────────────────────────────┤
│ bar  │  Revenue Analytics  · Factsheet · Methodology · API · ⋯  │
│      │ ┌────────────┬──────────────────────────────────────┐    │
│ Sum  │ │ INDEX      │  Revenue index chart   1D 1W 1M 1Y A │    │
│ Card │ │ $512.84    │                                       │    │
│ Tech │ │ +4.0%      │       ╭╮  ╭─╮                         │    │
│ Mkt  │ │ ~~sparkline│   ╭──╯ ╰──╯ ╰──╮     [$512.84]        │    │
│ Sect │ ├────────────┤                                       │    │
│ News │ │ YTD High   │  ▌▌ ▌▌▌ ▌ ▌▌▌▌ ▌▌▌  (volume)          │    │
│ Cap  │ │ YTD Low    │                                       │    │
│ Fin  │ └────────────┴──────────────────────────────────────┘    │
│ Forum│ ┌────────────────────────────────────────────────────┐    │
│      │ │ Top Accounts  [search] [sort] [USD] [Filter]       │    │
│      │ │ S.L  Account     ARR    Trend   Plan      Share    │    │
│      │ │  1   Acme Corp  $48k    +4.2%   Enterprise ███ 12% │    │
│      │ │  …                                                 │    │
│      │ └────────────────────────────────────────────────────┘    │
└──────┴──────────────────────────────────────────────────────────┘
```

## Sections

1. **Sidebar** (`collapsible="icon"`, narrow strip when collapsed)
   Brand mark + nav: Summary, Company Card, Technical Analysis, **Revenue Analytics** (active), Sectoral Counter, News, Capital Increase, Financial Statement, Forum. Icons from `lucide-react`.

2. **Header** — sidebar trigger, "Eman Pixel · PRO" chip with avatar, search input, Settings button, "Last update: just now" timestamp.

3. **Title row** — "Revenue Analytics" + ghost pills: Factsheet · Methodology · API details · More Details.

4. **Index card (left, 1/3 width)**
   - Label "INDEX", big number `$512.84`, badge `+4.0%` (orange-tinted), 7-day sparkline (Recharts `<Area>`).
   - Below: two small "Yearly Performance" tiles (YTD High / YTD Low) with colored range badges.

5. **Chart card (right, 2/3 width)**
   - Title "Revenue index chart" + timeframe tabs (1D / 1W / 1M / 1Y / All).
   - Candlestick-style bars (Recharts `ComposedChart` with custom bar shape rendering wick + body) + grey volume bars beneath, sharing X axis.
   - Floating price label tag pinned to the right axis (`$512.84`).

6. **Top Accounts table**
   - Toolbar: search input, sort dropdown, USD currency selector, **orange filled "Filter" button**.
   - Columns: S.L · Account (avatar + name + segment) · ARR · Trend (arrow + %, green/red) · Plan badge · Share of revenue (mini progress bar + %).
   - 9 mock rows.

## Visual system (pixel-faithful)

- **Palette (oklch tokens in `src/styles.css`, dark applied to `<html>`):**
  background `#0B0E13`, surface `#11151C`, surface-2 `#161B24`, border `#1E2430`, text `#E6E8EC`, muted `#8A93A2`, accent **orange `#F7931A`**, success `#22C55E`, danger `#EF4444`.
- **Typography:** Inter system stack, tabular-nums for all numbers, tight tracking on big figures.
- **Cards:** `rounded-xl`, 1px `border-border`, slightly lighter inner surface, generous 20–24px padding.
- **Accent usage:** orange reserved for primary CTA (Filter), positive deltas in the index card, the floating price tag, and the active sidebar item.

## Tech notes

- Replace `src/routes/index.tsx` placeholder with the dashboard.
- Update `src/routes/__root.tsx` to add `dark` class to `<html>` and per-page `head()` title "Revenue Analytics — Ollex".
- New files:
  - `src/components/dashboard/AppSidebar.tsx`
  - `src/components/dashboard/DashboardHeader.tsx`
  - `src/components/dashboard/IndexCard.tsx` (price + sparkline + YTD tiles)
  - `src/components/dashboard/RevenueChart.tsx` (custom candle shape + volume)
  - `src/components/dashboard/AccountsTable.tsx`
  - `src/lib/mock-analytics.ts` (OHLC series, volume series, accounts)
- Uses existing shadcn `Sidebar`, `Button`, `Input`, `Badge`, `Table`, `Tabs`, `Progress`, `Avatar`, `DropdownMenu`. Recharts already available via `chart.tsx`.
- Responsive: index/chart grid stacks below `md`; sidebar collapses to icon strip below `lg`; table gets horizontal scroll on small screens.
