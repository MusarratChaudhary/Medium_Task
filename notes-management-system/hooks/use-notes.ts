import { useState, useEffect, useCallback, useRef } from 'react';

export interface Note {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  isDeleted: boolean;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const isFirstRender = useRef(true);

  const fetchNotes = useCallback(async (search: string = '') => {
    try {
      const res = await fetch(`/api/notes?search=${encodeURIComponent(search)}`);
      if (!res.ok) throw new Error('Failed to fetch notes');
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchNotes(searchTerm);
    } else {
      const timeoutId = setTimeout(() => {
        fetchNotes(searchTerm);
      }, 300); // Debounce search
      return () => clearTimeout(timeoutId);
    }
  }, [searchTerm, fetchNotes]);

  const addNote = async (note: { title: string; content: string; tags: string[] }) => {
    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
      if (!res.ok) throw new Error('Failed to add note');
      const newNote = await res.json();
      setNotes((prev) => [newNote, ...prev]);
      return newNote;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      throw err;
    }
  };

  const updateNote = async (id: string, note: { title: string; content: string; tags: string[] }) => {
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to update note');
      }
      const updatedNote = await res.json();
      setNotes((prev) => prev.map((n) => (n._id === id ? updatedNote : n)));
      return updatedNote;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      throw err;
    }
  };

  const deleteNote = async (id: string) => {
    try {
      const res = await fetch(`/api/notes/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete note');
      setNotes((prev) => prev.map((n) => (n._id === id ? { ...n, isDeleted: true } : n)));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      throw err;
    }
  };

  const restoreNote = async (id: string) => {
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'restore' }),
      });
      if (!res.ok) throw new Error('Failed to restore note');
      setNotes((prev) => prev.map((n) => (n._id === id ? { ...n, isDeleted: false } : n)));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      throw err;
    }
  };

  const permanentlyDeleteNote = async (id: string) => {
    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_permanently' }),
      });
      if (!res.ok) throw new Error('Failed to delete note permanently');
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      throw err;
    }
  };

  const toggleFavorite = async (id: string) => {
    // Optimistic Update
    const previousNotes = [...notes];
    setNotes((prev) => prev.map((n) => (n._id === id ? { ...n, isFavorite: !n.isFavorite } : n)));

    try {
      const res = await fetch(`/api/notes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'toggle_favorite' }),
      });
      if (!res.ok) throw new Error('Failed to toggle favorite');
      // No need to update state again if optimistic update is accurate
    } catch (err) {
      // Revert on error
      setNotes(previousNotes);
      const message = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(message);
      throw err;
    }
  };

  return {
    notes,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    addNote,
    updateNote,
    deleteNote,
    restoreNote,
    permanentlyDeleteNote,
    toggleFavorite,
    refreshNotes: () => fetchNotes(searchTerm),
  };
}
