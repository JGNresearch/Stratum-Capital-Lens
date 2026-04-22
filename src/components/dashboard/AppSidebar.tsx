import {
  LayoutDashboard,
  IdCard,
  Activity,
  LineChart,
  Layers,
  Newspaper,
  TrendingUp,
  FileText,
  MessagesSquare,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const items = [
  { title: "Summary", icon: LayoutDashboard, active: false },
  { title: "Company Card", icon: IdCard, active: false },
  { title: "Technical Analysis", icon: Activity, active: false },
  { title: "Revenue Analytics", icon: LineChart, active: true },
  { title: "Sectoral Counter", icon: Layers, active: false },
  { title: "News", icon: Newspaper, active: false },
  { title: "Capital Increase", icon: TrendingUp, active: false },
  { title: "Financial Statement", icon: FileText, active: false },
  { title: "Forum", icon: MessagesSquare, active: false },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex h-12 items-center gap-2 px-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <span className="text-sm font-bold">O</span>
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-tight">Ollex</span>
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Analytics
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={item.active}
                    className={cn(
                      "h-10 rounded-md text-[13px]",
                      item.active &&
                        "bg-primary/10 text-primary hover:bg-primary/15 hover:text-primary data-[active=true]:bg-primary/10 data-[active=true]:text-primary",
                    )}
                  >
                    <item.icon className="size-4" />
                    <span className="truncate">{item.title}</span>
                    {item.active && (
                      <span className="ml-auto h-5 w-1 rounded-full bg-primary" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
