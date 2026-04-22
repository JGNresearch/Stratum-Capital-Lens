import { Search, Settings, Bell } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md">
      <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground" />

      <div className="flex items-center gap-2 rounded-full border border-border bg-surface px-1.5 py-1">
        <Avatar className="h-6 w-6">
          <AvatarFallback className="bg-primary/20 text-[10px] font-semibold text-primary">
            EP
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center gap-1.5 pr-2 text-xs">
          <span className="font-medium text-foreground">Eman Pixel</span>
          <span className="rounded-sm bg-primary/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
            Pro
          </span>
        </div>
      </div>

      <div className="relative ml-2 hidden flex-1 max-w-md md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search accounts, metrics, reports…"
          className="h-9 rounded-md border-border bg-surface pl-9 text-sm placeholder:text-muted-foreground/70 focus-visible:ring-1 focus-visible:ring-primary"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="size-9 text-muted-foreground hover:bg-surface hover:text-foreground"
        >
          <Bell className="size-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="hidden h-9 gap-2 border-border bg-surface text-xs text-foreground hover:bg-surface-2 sm:inline-flex"
        >
          <Settings className="size-3.5" />
          Settings
        </Button>
        <div className="hidden flex-col items-end leading-tight md:flex">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Last update
          </span>
          <span className="text-xs font-medium text-foreground">just now</span>
        </div>
      </div>
    </header>
  );
}
