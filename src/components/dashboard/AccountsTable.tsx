import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Search, ChevronDown, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { accounts } from "@/lib/mock-analytics";
import { cn } from "@/lib/utils";

function fmtMoney(n: number) {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}k`;
  return `$${n}`;
}

const planStyle: Record<string, string> = {
  Enterprise: "bg-primary/15 text-primary border-primary/30",
  Business: "bg-sky-500/15 text-sky-400 border-sky-500/30",
  Pro: "bg-violet-500/15 text-violet-400 border-violet-500/30",
  Starter: "bg-muted text-muted-foreground border-border",
};

export function AccountsTable() {
  const [query, setQuery] = useState("");
  const filtered = accounts.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="rounded-xl border border-border bg-card">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            Top customer accounts
          </h3>
          <p className="text-xs text-muted-foreground">
            Ranked by annual recurring revenue
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search account…"
              className="h-9 w-48 rounded-md border-border bg-surface pl-9 text-xs"
            />
          </div>
          <button className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-xs text-foreground hover:bg-surface-2">
            Sort by ARR
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </button>
          <button className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-surface px-3 text-xs text-foreground hover:bg-surface-2">
            USD
            <ChevronDown className="size-3.5 text-muted-foreground" />
          </button>
          <Button
            size="sm"
            className="h-9 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Filter className="size-3.5" />
            Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-12 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                S.L
              </TableHead>
              <TableHead className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Account
              </TableHead>
              <TableHead className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                ARR
              </TableHead>
              <TableHead className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Trend
              </TableHead>
              <TableHead className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Plan
              </TableHead>
              <TableHead className="min-w-[200px] text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Share of revenue
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((acc, idx) => {
              const up = acc.trend >= 0;
              return (
                <TableRow
                  key={acc.id}
                  className="border-border transition-colors hover:bg-surface/60"
                >
                  <TableCell className="text-xs tabular-nums text-muted-foreground">
                    {String(idx + 1).padStart(2, "0")}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex size-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold",
                          acc.color,
                        )}
                      >
                        {acc.initials}
                      </div>
                      <div className="leading-tight">
                        <div className="text-sm font-medium text-foreground">
                          {acc.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {acc.segment}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm font-semibold tabular-nums text-foreground">
                    {fmtMoney(acc.arr)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center gap-0.5 text-xs font-semibold tabular-nums",
                        up ? "text-emerald-400" : "text-rose-400",
                      )}
                    >
                      {up ? (
                        <ArrowUpRight className="size-3" />
                      ) : (
                        <ArrowDownRight className="size-3" />
                      )}
                      {up ? "+" : ""}
                      {acc.trend.toFixed(2)}%
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                        planStyle[acc.plan],
                      )}
                    >
                      {acc.plan}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-32 overflow-hidden rounded-full bg-surface-2">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${Math.min(100, acc.share * 6)}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium tabular-nums text-foreground">
                        {acc.share.toFixed(1)}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
