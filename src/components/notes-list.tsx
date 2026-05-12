import { darkTheme, lightTheme } from "@/constants/theme-color";
import { INote } from "@/interface/note-interface";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  RefreshControl,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";

export default function NotesList({
  isDarkMode,
  toggleTheme,
  onOpenEditor,
  notes,
  onDeleteNote,
}: {
  isDarkMode: boolean;
  toggleTheme: () => void;
  onOpenEditor: (note?: INote) => void;
  notes: INote[];
  onDeleteNote: (id: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { width } = useWindowDimensions();

  // Dynamic columns
  const numColumns = width > 1000 ? 5 : width > 768 ? 4 : width > 500 ? 3 : 2;

  const theme = isDarkMode ? darkTheme : lightTheme;

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
    }, 1200);
  };

  const confirmDelete = (id: string) => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => onDeleteNote(id),
        },
      ]
    );
  };

  const renderCard = ({ item }: { item: INote }) => (
    <Pressable
      onPress={() => onOpenEditor(item)}
      style={({ pressed }) => [
        styles.noteCard,
        {
          backgroundColor: theme.cardBackground,
          opacity: pressed ? 0.7 : 1,
          borderBottomColor: item.color,
          borderBottomWidth: isDarkMode ? 2 : 0,
        },
      ]}
    >
      <View>
        <Text
          style={[styles.noteTitle, { color: theme.text }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>

        <Text
          style={[styles.noteSnippet, { color: theme.subText }]}
          numberOfLines={5}
        >
          {item.snippet}
        </Text>
      </View>

      <View style={styles.cardFooter}>
        <Text
          style={[styles.noteDate, { color: theme.placeholder }]}
        >
          {item.date}
        </Text>

        <View style={styles.actionButtons}>
          <Pressable
            onPress={() => onOpenEditor(item)}
            style={styles.actionIcon}
          >
            <Ionicons
              name="pencil"
              size={16}
              color={theme.subText}
            />
          </Pressable>

          <Pressable
            onPress={() => confirmDelete(item.id)}
            style={styles.actionIcon}
          >
            <Ionicons
              name="trash"
              size={16}
              color="#EF4444"
            />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.background }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            My Notes
          </Text>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name={isDarkMode ? "moon" : "sunny"}
              size={22}
              color={isDarkMode ? "#FF6B00" : "#000"}
              style={{ marginRight: 8 }}
            />
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: "#000", true: "rgba(255, 107, 0, 0.4)" }}
              thumbColor={isDarkMode ? "#FF6B00" : "#D1D5DB"}
            />
          </View>
        </View>

        <FlatList
          key={numColumns}
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={isDarkMode ? "#FFFFFF" : "#000000"}
              colors={["#FF6B00"]}
            />
          }
          contentContainerStyle={[
            styles.listContent,
            {
              paddingBottom: 170,
            },
          ]}
          renderItem={renderCard}
        />

        <View style={styles.bottomContainer}>
          <BlurView
            intensity={70}
            tint={isDarkMode ? "dark" : "light"}
            style={styles.searchBlur}
          >
            <Ionicons
              name="search"
              size={20}
              color={theme.placeholder}
              style={{ marginRight: 10 }}
            />

            <TextInput
              placeholder="Search notes..."
              placeholderTextColor={theme.placeholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
              style={[
                styles.searchInput,
                {
                  color: theme.text,
                },
              ]}
            />
          </BlurView>

          <Pressable
            onPress={() => onOpenEditor()}
            style={styles.addButton}
          >
            <Ionicons name="add" size={30} color="#fff" />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}


const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },

  listContent: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },

  noteCard: {
    flex: 1,
    margin: 6,
    padding: 16,
    borderRadius: 10,
    minHeight: 190,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  noteTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
  },

  noteSnippet: {
    fontSize: 13,
    lineHeight: 20,
  },

  noteDate: {
    fontSize: 12,
  },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },

  actionIcon: {
    padding: 7,
    marginLeft: 8,
    backgroundColor: "rgba(150,150,150,0.12)",
    borderRadius: 10,
  },

  /* FLOATING BAR */

  bottomContainer: {
    position: "absolute",
    bottom: 24,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    zIndex: 100,
    backgroundColor: "transparent",
  },

  searchBlur: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 5,
    overflow: "hidden",
    marginRight: 8,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
  },

  addButton: {
    width: 50,
    height: 50,
    borderRadius: 29,
    backgroundColor: "#FF6B00",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#FF6B00",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
});