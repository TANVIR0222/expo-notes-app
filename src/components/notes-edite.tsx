import { darkTheme, lightTheme } from '@/constants/theme-color';
import { INote } from '@/interface/note-interface';
import React, { useEffect, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface NoteEditorProps {
  isDarkMode: boolean;
  visible: boolean;
  onClose: () => void;
  initialNote: INote | null;
  onSave: (label: string, title: string, content: string) => void;
}

export default function NoteEditor({ isDarkMode, visible, onClose, initialNote, onSave }: NoteEditorProps) {
  const [label, setLabel] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (visible) {
      if (initialNote) {
        setLabel(initialNote.label || '');
        setTitle(initialNote.title);
        setContent(initialNote.snippet);
      } else {
        setLabel('');
        setTitle('');
        setContent('');
      }
    }
  }, [visible, initialNote]);

  const handleSave = () => {
    onSave(label, title, content);
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <View style={[
              styles.modalContent,
              { backgroundColor: theme.background, paddingBottom: Math.max(insets.bottom, 24) },
              width > 768 && { maxWidth: 600, alignSelf: 'center', borderRadius: 24, marginBottom: 24 }
            ]}>

              {/* Header */}
              <View style={styles.header}>
                <Text style={[styles.headerTitle, { color: theme.text }]}>
                  {initialNote ? 'Edit Note' : 'New Note'}
                </Text>
                <View style={styles.headerActions}>
                  <Pressable onPress={onClose} style={styles.cancelButton}>
                    <Text style={{ color: theme.subText, fontSize: 16 }}>Cancel</Text>
                  </Pressable>
                  <Pressable onPress={handleSave} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save</Text>
                  </Pressable>
                </View>
              </View>

              {/* Form */}
              <View style={styles.formContainer}>

                <TextInput
                  style={[styles.titleInput, { color: theme.text, borderColor: theme.border }]}
                  placeholder="Title"
                  placeholderTextColor={theme.placeholder}
                  value={title}
                  onChangeText={setTitle}
                // placeholderFontWeight='bold'
                />

                <TextInput
                  style={[styles.detailsInput, { color: theme.text, borderColor: theme.border }]}
                  placeholder="Details"
                  placeholderTextColor={theme.placeholder}
                  value={content}
                  onChangeText={setContent}
                  multiline
                  textAlignVertical="top"
                />
              </View>

            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}



const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  keyboardView: {
    width: '100%',
  },
  modalContent: {
    width: '100%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    paddingHorizontal: 20,
    minHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelButton: {
    marginRight: 16,
    padding: 8,
  },
  saveButton: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  formContainer: {
    flex: 1,
  },
  labelContainer: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
  },
  labelInput: {
    fontSize: 14,
    fontWeight: '500',
  },
  titleInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
  },
  detailsInput: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 15,
    minHeight: 250,
  },
});
