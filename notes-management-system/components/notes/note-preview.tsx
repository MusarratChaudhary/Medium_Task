"use client";

import React from "react";
import { Note } from "@/hooks/use-notes";
import { format } from "date-fns";
import { Calendar, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNotesContext } from "./notes-context";
import { NoteModal } from "./note-modal";

export function NotePreview({ note }: { note: Note }) {
  const { setSelectedNote } = useNotesContext();

  return (
    <div className="flex-1 flex flex-col p-8 overflow-y-auto relative">
      <div className="absolute top-4 right-4 flex gap-2">
        <NoteModal>
          <Button variant="outline" size="sm" className="h-8 text-xs border-dashed">
            <Plus className="h-3.5 w-3.5 mr-1" />
            New
          </Button>
        </NoteModal>
        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedNote(null)}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="mb-6 mt-8">
        <h1 className="text-2xl font-bold tracking-tight mb-2">{note.title}</h1>
        <div className="flex items-center text-xs text-muted-foreground gap-2 font-medium">
          <Calendar className="h-3.5 w-3.5" />
          <span>Last updated: {format(new Date(note.updatedAt), "PPP p")}</span>
        </div>
      </div>
      <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-wrap">
        {note.content}
      </div>
    </div>
  );
}
