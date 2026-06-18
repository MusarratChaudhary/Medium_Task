"use client";

import * as React from "react";
import { 
  Plus, 
  Search, 
  Hash, 
  Clock, 
  Star, 
  Trash2, 
  Settings, 
  ChevronRight,
  ChevronLeft,
  LayoutDashboard,
  Inbox,
  Command,
  Sun,
  Moon
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { useNotesContext } from "../notes/notes-context";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const { setCurrentView, currentView, setSearchTerm } = useNotesContext();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (res.ok) {
        router.push("/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside 
        className={cn(
          "relative flex flex-col h-screen border-r bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[64px]" : "w-[260px]"
        )}
      >
        <div className="flex items-center justify-between p-4 h-16">
          {!isCollapsed && (
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Hash className="h-4 w-4" />
              </div>
              <span className="text-sm tracking-tight text-primary">Lumina Notes</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="h-8 w-8 text-sidebar-foreground hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <div className="px-3 py-2 space-y-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={cn("relative w-full", isCollapsed && "flex justify-center")}>
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={cn(
                    "w-full h-9 pl-9 pr-3 rounded-md bg-white/5 border border-white/5 text-xs focus:outline-none focus:border-primary transition-all",
                    isCollapsed && "hidden"
                  )}
                />
                <Search className={cn("absolute left-3 top-2.5 h-4 w-4 text-sidebar-foreground/50", isCollapsed && "relative left-0")} />
              </div>
            </TooltipTrigger>
            {isCollapsed && <TooltipContent side="right">Search</TooltipContent>}
          </Tooltip>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
          <div className="space-y-1">
            {!isCollapsed && <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-sidebar-foreground/30 mb-2">Workspace</h3>}
            <SidebarNavItem icon={Inbox} label="Inbox" isCollapsed={isCollapsed} active={currentView === 'all'} onClick={() => setCurrentView('all')} />
            <SidebarNavItem icon={LayoutDashboard} label="All Notes" isCollapsed={isCollapsed} active={currentView === 'all'} onClick={() => setCurrentView('all')} />
            <SidebarNavItem icon={Star} label="Favorites" isCollapsed={isCollapsed} active={currentView === 'favorites'} onClick={() => setCurrentView('favorites')} />
          </div>

          <div className="space-y-1">
            {!isCollapsed && <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-sidebar-foreground/30 mb-2">Collections</h3>}
            <SidebarNavItem icon={Hash} label="Work" isCollapsed={isCollapsed} onClick={() => console.log("Work clicked")} />
            <SidebarNavItem icon={Hash} label="Personal" isCollapsed={isCollapsed} onClick={() => console.log("Personal clicked")} />
            <SidebarNavItem icon={Hash} label="Projects" isCollapsed={isCollapsed} onClick={() => console.log("Projects clicked")} />
          </div>
        </div>

        <div className="p-3 border-t border-white/5 space-y-1 bg-sidebar/50">
          <SidebarNavItem icon={Trash2} label="Trash" isCollapsed={isCollapsed} active={currentView === 'trash'} onClick={() => setCurrentView('trash')} />
          <SidebarNavItem icon={Settings} label="Settings" isCollapsed={isCollapsed} onClick={() => console.log("Settings clicked")} />
          
          <Button
            variant="ghost"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={cn(
              "w-full justify-start gap-3 px-3 text-sidebar-foreground hover:bg-sidebar-foreground/10 hover:text-sidebar-foreground",
              isCollapsed && "px-0 justify-center"
            )}
          >
            {mounted && theme === 'dark' ? <Sun className="h-4 w-4 text-orange-400" /> : <Moon className="h-4 w-4 text-primary" />}
            {!isCollapsed && <span className="text-xs font-medium">{mounted && theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </Button>

          <Button
            variant="ghost"
            onClick={handleLogout}
            className={cn(
              "w-full justify-start gap-3 px-3 text-destructive hover:bg-destructive/10 hover:text-destructive",
              isCollapsed && "px-0 justify-center"
            )}
          >
            <LogOut className="h-4 w-4" />
            {!isCollapsed && <span className="text-xs font-medium">Logout</span>}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  );
}

interface SidebarNavItemProps {
  icon: React.ElementType;
  label: string;
  count?: number;
  active?: boolean;
  isCollapsed: boolean;
  onClick?: () => void;
}

function SidebarNavItem({ icon: Icon, label, count, active, isCollapsed, onClick }: SidebarNavItemProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          onClick={onClick}
          className={cn(
            "w-full justify-start gap-3 px-3 h-8 text-sidebar-foreground hover:bg-primary/5 hover:text-primary transition-all",
            active && "bg-primary/10 text-primary border-r-2 border-primary rounded-r-none",
            isCollapsed && "px-0 justify-center rounded-md"
          )}
        >
          <Icon className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "text-sidebar-foreground/60")} />
          {!isCollapsed && (
            <div className="flex flex-1 items-center justify-between overflow-hidden">
              <span className={cn("truncate text-xs font-medium", active && "font-bold")}>{label}</span>
              {count !== undefined && <span className={cn("text-[10px]", active ? "text-primary/70" : "text-sidebar-foreground/30")}>{count}</span>}
            </div>
          )}
        </Button>
      </TooltipTrigger>
      {isCollapsed && <TooltipContent side="right">{label}</TooltipContent>}
    </Tooltip>
  );
}
