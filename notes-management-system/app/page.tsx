"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Sidebar } from "@/components/layout/sidebar";
import { NoteList } from "@/components/notes/note-list";
import { NoteModal } from "@/components/notes/note-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNotesContext } from "@/components/notes/notes-context";
import { NotePreview } from "@/components/notes/note-preview";

export default function DashboardPage() {
  const { selectedNote, setSelectedNote } = useNotesContext();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // 1024px is the lg breakpoint in Tailwind CSS
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* SaaS Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* The NoteList component handles its own header and grid */}
        <NoteList />

        {/* Floating Action Button (Mobile/Quick Access) */}
        <div className="absolute bottom-8 right-8 z-20 md:hidden">
          <NoteModal>
            <Button size="icon" className="h-14 w-14 rounded-full shadow-2xl shadow-primary/40 active:scale-90 transition-transform">
              <Plus className="h-6 w-6" />
            </Button>
          </NoteModal>
        </div>
      </main>

      {/* Side Peek / Editor Placeholder (Visible on Large Screens) */}
      <div className="hidden lg:flex w-[400px] border-l bg-sidebar/30 backdrop-blur-sm flex-col items-center justify-center text-center">
        {selectedNote ? (
          <NotePreview note={selectedNote} />
        ) : (
          <div className="flex flex-col items-center justify-center p-12">
            <div className="h-20 w-20 rounded-2xl bg-secondary/50 flex items-center justify-center mb-6 border border-white/5">
              <Plus className="h-8 w-8 text-muted-foreground/20" />
            </div>
            <h3 className="text-sm font-semibold mb-2">Select a note to view</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Choose a note from the list or create a new one to start writing.
            </p>
            <NoteModal>
              <Button variant="outline" size="sm" className="mt-6 h-8 text-xs border-dashed">
                Create new note
              </Button>
            </NoteModal>
          </div>
        )}
      </div>

      {/* Mobile Dialog view for Selected Note */}
      {isMobile && (
        <DialogPrimitive.Root open={!!selectedNote} onOpenChange={(open) => !open && setSelectedNote(null)}>
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-300" />
            <DialogPrimitive.Content 
              className="fixed left-[50%] top-[50%] z-50 w-[90vw] max-w-lg translate-x-[-50%] translate-y-[-50%] border bg-card p-0 shadow-2xl duration-200 animate-in fade-in zoom-in-95 rounded-2xl flex flex-col max-h-[85vh] overflow-hidden"
            >
              <div className="overflow-y-auto custom-scrollbar">
                {selectedNote && <NotePreview note={selectedNote} />}
              </div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      )}
    </div>
  );
}
