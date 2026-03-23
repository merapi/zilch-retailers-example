import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { fetchRetailers } from "@/api/retailers";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useDebounce } from "@/hooks/use-debounce";
import { useTheme } from "@/hooks/use-theme";
import { Retailer } from "@/types/retailer";

const isIOS = Platform.OS === "ios";
const iosVersion = isIOS ? parseInt(String(Platform.Version), 10) : 0;
const supportsGlassTabBar = isIOS && iosVersion >= 26;

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 250);
  const colors = useTheme();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["retailers", debouncedSearch],
    queryFn: () => fetchRetailers(debouncedSearch),
    retry: false,
  });

  const renderItem = ({ item }: { item: Retailer }) => (
    <Pressable
      testID={`retailer-card-${item.id}`}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.backgroundElement,
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      onPress={() => router.push({ pathname: "/retailer/[id]", params: { id: item.id } })}
    >
      <Image source={item.logo} style={styles.logo} />
      <ThemedView style={styles.info}>
        <ThemedText type="subtitle">{item.name}</ThemedText>
        <ThemedText style={{ color: colors.textSecondary }}>
          {item.category}
        </ThemedText>
      </ThemedView>
    </Pressable>
  );

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView
        style={styles.safeArea}
        edges={
          supportsGlassTabBar
            ? ["top", "left", "right"]
            : ["top", "left", "right", "bottom"]
        }
      >
        <ThemedText type="title" style={styles.title}>
          Retailers
        </ThemedText>

        <View style={styles.searchContainer}>
          <TextInput
            style={[
              styles.searchInput,
              { backgroundColor: colors.backgroundElement, color: colors.text },
            ]}
            placeholder="Search retailers..."
            placeholderTextColor={colors.textSecondary}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <Pressable 
              onPress={() => setSearch("")} 
              style={styles.clearButton}
              testID="clear-search-button"
            >
              <Ionicons
                name="close-circle"
                size={20}
                color={colors.textSecondary}
              />
            </Pressable>
          )}
        </View>

        {isLoading ? (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color={colors.text}
          />
        ) : isError ? (
          <View style={styles.errorContainer}>
            <Ionicons
              name="warning"
              size={48}
              color="red"
              style={{ marginBottom: Spacing.two }}
            />
            <ThemedText style={styles.error}>
              Failed to load retailers.
            </ThemedText>
            <Pressable
              style={[styles.retryButton, { backgroundColor: colors.text }]}
              onPress={() => refetch()}
            >
              <ThemedText
                style={[styles.retryText, { color: colors.background }]}
              >
                Retry
              </ThemedText>
            </Pressable>
          </View>
        ) : data?.length === 0 ? (
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>
              No retailers found.
            </ThemedText>
          </ThemedView>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.listContent}
            keyboardShouldPersistTaps="handled"
          />
        )}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  title: {
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.four,
    paddingBottom: Spacing.two,
  },
  searchContainer: {
    marginHorizontal: Spacing.four,
    marginBottom: Spacing.four,
    position: "relative",
    justifyContent: "center",
  },
  searchInput: {
    padding: Spacing.three,
    paddingRight: Spacing.six,
    borderRadius: Spacing.two,
    fontSize: 16,
  },
  clearButton: {
    position: "absolute",
    right: Spacing.three,
    padding: Spacing.one,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    textAlign: "center",
    color: "red",
    marginBottom: Spacing.four,
  },
  retryButton: {
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.two,
    borderRadius: Spacing.one,
  },
  retryText: {
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#60646C",
  },
  listContent: {
    paddingHorizontal: Spacing.four,
    paddingBottom: 100,
    gap: Spacing.three,
  },
  card: {
    flexDirection: "row",
    padding: Spacing.three,
    borderRadius: Spacing.two,
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: Spacing.three,
    backgroundColor: "#fff",
  },
  info: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
