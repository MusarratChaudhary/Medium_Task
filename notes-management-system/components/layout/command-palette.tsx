"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Search, Plus, Clock, Star, Trash2, Command, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

import { useNotesContext } from "@/components/notes/notes-context";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const { searchTerm, setSearchTerm, notes } = useNotesContext();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300" />
        <DialogPrimitive.Content 
          className="fixed left-[50%] top-[15%] z-50 w-full max-w-xl translate-x-[-50%] border bg-card/95 backdrop-blur-xl shadow-2xl duration-200 animate-in fade-in zoom-in-95 sm:rounded-2xl overflow-hidden"
        >
          <div className="flex items-center px-4 py-3 border-b border-border/50">
            <Search className="h-4 w-4 mr-3 text-muted-foreground" />
            <input 
              placeholder="Search notes, tags, actions..." 
              className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex items-center gap-1.5 ml-2">
              <span className="text-[10px] bg-secondary text-muted-foreground px-1.5 py-0.5 rounded border border-border/50 font-medium uppercase tracking-wider">Esc</span>
            </div>
          </div>

          <div className="p-2 max-h-[400px] overflow-y-auto">
            {notes.length > 0 ? (
              <CommandSection title="Found Notes">
                {notes.slice(0, 5).map(note => (
                  <CommandItem key={note._id} icon={FileText} label={note.title} shortcut="Enter" />
                ))}
              </CommandSection>
            ) : searchTerm ? (
              <div className="p-4 text-center text-xs text-muted-foreground uppercase tracking-widest font-bold">No matches found</div>
            ) : null}

            <CommandSection title="Quick Actions">
              <CommandItem icon={Plus} label="Create New Note" shortcut="N" />
              <CommandItem icon={Star} label="Go to Favorites" shortcut="G F" />
              <CommandItem icon={Trash2} label="View Trash" shortcut="G T" />
            </CommandSection>
          </div>

          <div className="px-4 py-3 border-t border-border/50 bg-secondary/30 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] bg-card text-muted-foreground px-1 py-0.5 rounded border border-border/50 font-bold">↑↓</span>
                <span className="text-[10px] text-muted-foreground">Navigate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] bg-card text-muted-foreground px-1 py-0.5 rounded border border-border/50 font-bold">↵</span>
                <span className="text-[10px] text-muted-foreground">Open</span>
              </div>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground/50">
              <Command className="h-3 w-3" />
              <span>Lumina Search</span>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function CommandSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-2">
      <h3 className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/50">{title}</h3>
      <div className="space-y-0.5">{children}</div>
    </div>
  );
}

function CommandItem({ icon: Icon, label, shortcut }: { icon: React.ElementType; label: string; shortcut?: string }) {
  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors group">
      <div className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      {shortcut && (
        <span className="text-[10px] text-muted-foreground/40 font-mono tracking-widest">{shortcut}</span>
      )}
    </div>
  );
}
