"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MoreHorizontal, Trash2, Edit2, Tag, Plus, RotateCcw, Trash, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNotesContext } from "./notes-context";
import { formatDistanceToNow } from "date-fns";
import { Note } from "@/hooks/use-notes";
import { NoteModal } from "./note-modal";
import { DeleteConfirmationModal } from "./delete-confirmation-modal";

export function NoteList() {
  const { notes, loading, error, currentView, sortBy, setSortBy } = useNotesContext();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortOptions = [
    { label: "Recently Updated", value: "updatedAtDesc" },
    { label: "Oldest First", value: "updatedAtAsc" },
    { label: "Title A - Z", value: "titleAsc" },
    { label: "Title Z - A", value: "titleDesc" },
  ] as const;

  const currentSortLabel = sortOptions.find(o => o.value === sortBy)?.label || "Recently Updated";

  const filteredNotes = React.useMemo(() => {
    const filtered = notes.filter((note) => {
      if (currentView === 'trash') return note.isDeleted;
      if (currentView === 'favorites') return note.isFavorite && !note.isDeleted;
      return !note.isDeleted;
    });

    return [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'updatedAtDesc':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        case 'updatedAtAsc':
          return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
        case 'titleAsc':
          return a.title.localeCompare(b.title);
        case 'titleDesc':
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [notes, currentView, sortBy]);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Syncing your workspace...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <p className="text-sm font-bold text-destructive uppercase tracking-wider">{error}</p>
          <Button variant="outline" size="sm" onClick={() => window.location.reload()}>Retry Sync</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden">
      <header className="h-16 border-b flex items-center justify-between px-6 shrink-0 bg-background/80 backdrop-blur-md z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-bold tracking-tight capitalize">{currentView}</h2>
          <span className="text-[10px] bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-bold border border-primary/20">{filteredNotes.length} Notes</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative" ref={dropdownRef}>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-xs font-semibold hover:bg-primary/5 hover:text-primary"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {currentSortLabel}
            </Button>
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-40 bg-card border rounded-lg shadow-lg z-20 py-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    className={cn(
                      "w-full text-left px-4 py-2 text-xs font-semibold hover:bg-primary/5 hover:text-primary",
                      sortBy === option.value && "text-primary bg-primary/5"
                    )}
                    onClick={() => {
                      setSortBy(option.value);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/5 hover:text-primary"><MoreHorizontal className="h-4 w-4" /></Button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredNotes.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center p-12 text-center">
            <div className="h-16 w-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-6 border border-white/5">
              <Plus className="h-6 w-6 text-muted-foreground/20" />
            </div>
            <h3 className="text-sm font-semibold mb-2">No notes found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
            {filteredNotes.map((note, index) => (
              <NoteCard key={note._id} note={note} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function NoteCard({ note, index }: { note: Note; index: number }) {
  const { deleteNote, restoreNote, permanentlyDeleteNote, toggleFavorite, selectedNote, setSelectedNote, currentView } = useNotesContext();
  const isActive = selectedNote?._id === note._id;

  const handleDelete = async () => await deleteNote(note._id);
  const handleRestore = async () => await restoreNote(note._id);
  const handlePermanentlyDelete = async () => await permanentlyDeleteNote(note._id);
  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await toggleFavorite(note._id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      onClick={() => setSelectedNote(note)}
      className={cn(
        "group relative flex flex-col p-5 rounded-2xl border bg-card hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer shadow-sm",
        isActive && "border-primary ring-1 ring-primary"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-bold truncate flex-1 pr-4 tracking-tight group-hover:text-primary transition-colors">{note.title}</h3>
      </div>
      
      <p className="text-xs text-muted-foreground line-clamp-3 mb-5 flex-1 leading-relaxed font-medium">
        {note.content}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
        <div className="flex items-center gap-2 overflow-hidden">
          {note.tags?.map((tag: string) => (
            <span key={tag} className="flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded border border-primary/10 transition-colors group-hover:bg-primary/10">
              <Tag className="h-2.5 w-2.5" />
              {tag}
            </span>
          ))}
        </div>
        <span className="text-[10px] text-muted-foreground/60 font-bold tracking-tight whitespace-nowrap ml-2">
          {formatDistanceToNow(new Date(note.updatedAt))} ago
        </span>
      </div>

      {/* Top Right Action Container */}
      <div className="absolute top-3 right-3 flex items-center gap-1 bg-card/80 backdrop-blur-sm p-0.5 rounded-lg border shadow-sm">
        {currentView === 'all' || currentView === 'favorites' ? (
          <>
            <button 
              onClick={handleToggleFavorite} 
              className="p-1.5 rounded-md hover:bg-primary/10 transition-colors"
            >
              <Star className={cn("h-3.5 w-3.5", note.isFavorite ? "fill-primary text-primary" : "text-muted-foreground")} />
            </button>
            <NoteModal mode="edit" note={note}>
              <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-primary/10 hover:text-primary">
                <Edit2 className="h-3.5 w-3.5" />
              </Button>
            </NoteModal>
            
            <DeleteConfirmationModal onConfirm={handleDelete}>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </DeleteConfirmationModal>
          </>
        ) : (
          <>
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-primary/10 hover:text-primary" onClick={handleRestore}>
              <RotateCcw className="h-3.5 w-3.5" />
            </Button>
            <DeleteConfirmationModal onConfirm={handlePermanentlyDelete}>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive">
                <Trash className="h-3.5 w-3.5" />
              </Button>
            </DeleteConfirmationModal>
          </>
        )}
      </div>
    </motion.div>
  );
}
