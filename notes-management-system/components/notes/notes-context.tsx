"use client";

import React, { createContext, useContext, ReactNode, useState } from 'react';
import { useNotes, Note } from '@/hooks/use-notes';

export type SortOption = 'updatedAtDesc' | 'updatedAtAsc' | 'titleAsc' | 'titleDesc';

interface NotesContextType {
  notes: Note[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  addNote: (note: { title: string; content: string; tags: string[] }) => Promise<Note>;
  updateNote: (id: string, note: { title: string; content: string; tags: string[] }) => Promise<Note>;
  deleteNote: (id: string) => Promise<void>;
  restoreNote: (id: string) => Promise<void>;
  permanentlyDeleteNote: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  refreshNotes: () => void;
  selectedNote: Note | null;
  setSelectedNote: (note: Note | null) => void;
  currentView: 'all' | 'trash' | 'favorites';
  setCurrentView: (view: 'all' | 'trash' | 'favorites') => void;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: ReactNode }) {
  const notesData = useNotes();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [currentView, setCurrentView] = useState<'all' | 'trash' | 'favorites'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('updatedAtDesc');

  return (
    <NotesContext.Provider value={{ ...notesData, selectedNote, setSelectedNote, currentView, setCurrentView, sortBy, setSortBy }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotesContext() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error('useNotesContext must be used within a NotesProvider');
  }
  return context;
}
