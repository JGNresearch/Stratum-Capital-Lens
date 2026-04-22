import { createFileRoute } from "@tanstack/react-router";
import { MoreHorizontal } from "lucide-react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { IndexCard } from "@/components/dashboard/IndexCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { AccountsTable } from "@/components/dashboard/AccountsTable";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Revenue Analytics — Ollex" },
      {
        name: "description",
        content:
          "Revenue index, daily candles and top customer accounts in a single dashboard.",
      },
    ],
  }),
  component: DashboardPage,
});

const PILLS = ["Factsheet", "Methodology", "API details", "More Details"];

function DashboardPage() {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <SidebarInset className="bg-background">
          <DashboardHeader />

          <main className="flex flex-col gap-5 p-4 md:p-6">
            {/* Title row */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-semibold tracking-tight text-foreground">
                  Revenue Analytics
                </h1>
                <span className="hidden text-xs text-muted-foreground sm:inline">
                  · MRR Index 100
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {PILLS.map((p) => (
                  <button
                    key={p}
                    className="inline-flex h-7 items-center rounded-full border border-border bg-surface px-3 text-[11px] font-medium text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
                  >
                    {p}
                  </button>
                ))}
                <button className="inline-flex size-7 items-center justify-center rounded-full border border-border bg-surface text-muted-foreground hover:bg-surface-2 hover:text-foreground">
                  <MoreHorizontal className="size-3.5" />
                </button>
              </div>
            </div>

            {/* Index + Chart grid */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              <div className="md:col-span-1">
                <IndexCard />
              </div>
              <div className="md:col-span-2">
                <RevenueChart />
              </div>
            </div>

            {/* Accounts table */}
            <AccountsTable />

            <p className="pb-4 text-center text-[11px] text-muted-foreground">
              Mock data for demonstration · Ollex Analytics © 2026
            </p>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
