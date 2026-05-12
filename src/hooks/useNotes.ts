import { COLORS } from '@/constants/theme-color';
import { INote } from '@/interface/note-interface';
import { INITIAL_NOTES } from '@/utils/data';
import { useState } from 'react';


export function useNotes() {
  const [notes, setNotes] = useState<INote[]>(INITIAL_NOTES);

  const addNote = (label: string, title: string, content: string) => {
    const newNote: INote = {
      id: Date.now().toString(),
      label: label || 'Uncategorized',
      title: title || 'Untitled Note',
      snippet: content.substring(0, 150),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const updateNote = (id: string, label: string, title: string, content: string) => {
    setNotes(prev => prev.map(note => {
      if (note.id === id) {
        return {
          ...note,
          label: label || 'Uncategorized',
          title: title || 'Untitled Note',
          snippet: content,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        };
      }
      return note;
    }));
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
  };
}
