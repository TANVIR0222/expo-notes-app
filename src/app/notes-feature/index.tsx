import NoteEditor from '@/components/notes-edite';
import NotesList from '@/components/notes-list';
import { INote } from '@/interface/note-interface';
import * as ScreenOrientation from "expo-screen-orientation";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useNotes } from "../../hooks/useNotes";

export default function Index() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEditorVisible, setIsEditorVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState<INote | null>(null);

  const { notes, addNote, updateNote, deleteNote } = useNotes();

  useEffect(() => {
    ScreenOrientation.unlockAsync();
  }, []);

  const handleOpenEditor = (note?: INote) => {
    if (note) {
      setSelectedNote(note);
    } else {
      setSelectedNote(null);
    }
    setIsEditorVisible(true);
  };

  const handleSaveNote = (label: string, title: string, content: string) => {
    if (selectedNote) {
      updateNote(selectedNote.id, label, title, content);
    } else {
      addNote(label, title, content);
    }
    setIsEditorVisible(false);
  };

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: isDarkMode ? "#121212" : "#F9FAFB" }}>
        <StatusBar style={isDarkMode ? "light" : "dark"} />

        <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
          <NotesList
            isDarkMode={isDarkMode}
            toggleTheme={() => setIsDarkMode(!isDarkMode)}
            onOpenEditor={handleOpenEditor}
            notes={notes}
            onDeleteNote={deleteNote}
          />
        </SafeAreaView>

        <NoteEditor
          isDarkMode={isDarkMode}
          visible={isEditorVisible}
          onClose={() => setIsEditorVisible(false)}
          initialNote={selectedNote}
          onSave={handleSaveNote}
        />
      </View>
    </SafeAreaProvider>
  );
}