import { Ionicons } from "@expo/vector-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { fetchRetailerDetails } from "@/api/retailers";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/use-theme";
import { Retailer, RetailerDetail } from "@/types/retailer";

export default function RetailerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useTheme();
  const queryClient = useQueryClient();

  // Try to find partial data from the list query cache
  const cachedQueries = queryClient.getQueriesData<Retailer[]>({
    queryKey: ["retailers"],
  });
  let initialData: Retailer | undefined;

  for (const [_, data] of cachedQueries) {
    const found = data?.find((r) => r.id === id);
    if (found) {
      initialData = found;
      break;
    }
  }

  const { data, isLoading, isError, refetch } = useQuery<RetailerDetail>({
    queryKey: ["retailer", id],
    queryFn: () => fetchRetailerDetails(id!),
    // Don't retry on error, we'll show a retry button instead - just to demonstrate error handling.
    retry: false,
    enabled: !!id,
    staleTime: 1000 * 10, // 10 seconds, just to demonstrate caching - in a real app you'd want something longer?
    placeholderData: initialData
      ? ({
          ...initialData,
          description: "",
          website: "",
          cashback: 0,
        } as RetailerDetail)
      : undefined,
  });

  const displayData = data || initialData;

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.header}>
          <Pressable 
            onPress={() => router.back()} 
            style={styles.backButton}
            testID="back-button"
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </Pressable>
        </ThemedView>

        {isLoading && !displayData ? (
          <ActivityIndicator
            style={styles.loader}
            size="large"
            color={colors.text}
          />
        ) : isError && !displayData ? (
          <View style={styles.errorContainer}>
            <Ionicons
              name="warning"
              size={48}
              color="red"
              style={{ marginBottom: Spacing.two }}
            />
            <ThemedText style={styles.error}>
              Failed to load retailer details.
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
        ) : displayData ? (
          <View style={styles.content}>
            <Image source={displayData.logo} style={styles.logo} />
            <ThemedText type="title" style={styles.name}>
              {displayData.name}
            </ThemedText>
            <ThemedText
              style={[styles.category, { color: colors.textSecondary }]}
            >
              {displayData.category}
            </ThemedText>

            {isError ? (
              <View style={[styles.card, { alignItems: "center" }]}>
                <Ionicons
                  name="warning"
                  size={32}
                  color="red"
                  style={{ marginBottom: Spacing.one }}
                />
                <ThemedText style={styles.error}>
                  Failed to load extra details.
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
            ) : data && (data as RetailerDetail).description ? (
              <ThemedView
                style={[
                  styles.card,
                  { backgroundColor: colors.backgroundElement },
                ]}
              >
                <ThemedText type="subtitle" style={styles.sectionTitle}>
                  About
                </ThemedText>
                <ThemedText>{(data as RetailerDetail).description}</ThemedText>

                <ThemedText
                  type="subtitle"
                  style={[styles.sectionTitle, { marginTop: Spacing.three }]}
                >
                  Website
                </ThemedText>
                <ThemedText style={{ color: "#00D287" }}>
                  {(data as RetailerDetail).website}
                </ThemedText>

                <ThemedText
                  type="subtitle"
                  style={[styles.sectionTitle, { marginTop: Spacing.three }]}
                >
                  Cashback
                </ThemedText>
                <ThemedText type="title" style={{ color: "#00D287" }}>
                  {(data as RetailerDetail).cashback}%
                </ThemedText>
              </ThemedView>
            ) : (
              <ActivityIndicator
                style={styles.loadingMore}
                size="small"
                color={colors.textSecondary}
              />
            )}
          </View>
        ) : null}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.two,
    paddingBottom: Spacing.four,
  },
  backButton: {
    marginRight: Spacing.three,
    padding: Spacing.two,
    marginLeft: -Spacing.two,
  },
  content: {
    paddingHorizontal: Spacing.four,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: Spacing.three,
    backgroundColor: "#fff",
  },
  name: {
    marginBottom: Spacing.one,
  },
  category: {
    marginBottom: Spacing.four,
  },
  card: {
    alignSelf: "stretch",
    padding: Spacing.four,
    borderRadius: Spacing.two,
    marginTop: Spacing.two,
  },
  sectionTitle: {
    marginBottom: Spacing.one,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingMore: {
    marginTop: Spacing.six,
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
});
