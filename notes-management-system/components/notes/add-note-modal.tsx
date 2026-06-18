"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Plus, Hash, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useNotesContext } from "./notes-context";

export function AddNoteModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [tags, setTags] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(false);
  const { addNote } = useNotesContext();

  const handleCreate = async () => {
    if (!title || !content) return;
    setLoading(true);
    try {
      await addNote({ title, content, tags });
      setOpen(false);
      setTitle("");
      setContent("");
      setTags([]);
    } catch (err) {
      alert("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Trigger asChild>
        {children}
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300" />
        <DialogPrimitive.Content 
          className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-card p-6 shadow-2xl duration-200 animate-in fade-in zoom-in-95 sm:rounded-2xl"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
                <Plus className="h-4 w-4" />
              </div>
              <DialogPrimitive.Title className="text-sm font-semibold">Create New Note</DialogPrimitive.Title>
            </div>
            <DialogPrimitive.Close className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-secondary transition-colors">
              <X className="h-4 w-4 text-muted-foreground" />
            </DialogPrimitive.Close>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Title</label>
              <Input 
                placeholder="Note title..." 
                className="h-11 text-sm bg-secondary/50 border-none focus-visible:ring-2 focus-visible:ring-primary/20 font-semibold" 
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Content</label>
              <textarea 
                placeholder="Start writing your thoughts..." 
                className="w-full min-h-[180px] rounded-xl border-none bg-secondary/50 p-4 text-sm placeholder:text-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 resize-none font-medium leading-relaxed"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-6">
              <div className="flex-1 space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">Tags</label>
                <div className="flex flex-wrap gap-2">
                  <Input 
                    placeholder="Add tags (comma separated)..." 
                    className="h-9 text-xs bg-secondary/50 border-none focus-visible:ring-2 focus-visible:ring-primary/20"
                    onChange={(e) => setTags(e.target.value.split(",").map(t => t.trim()).filter(t => t !== ""))}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-border/50">
            <DialogPrimitive.Close asChild>
              <Button variant="ghost" size="sm" className="h-10 px-6 text-xs font-bold hover:bg-secondary" disabled={loading}>Cancel</Button>
            </DialogPrimitive.Close>
            <Button size="sm" className="h-10 px-8 text-xs font-bold shadow-lg shadow-primary/20" onClick={handleCreate} disabled={loading}>
              {loading ? "Creating..." : "Create Note"}
            </Button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
