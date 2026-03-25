import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";

export default function AboutScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <ThemedText type="title" style={styles.title}>
            Project Overview
          </ThemedText>

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle">Core Architecture</ThemedText>
            <ThemedText style={styles.text}>
              This application implements a robust Master-Detail flow using
              React Native and Expo. It demonstrates Staff-level engineering
              patterns focusing on performance, testability, and type safety.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle">Tech Stack</ThemedText>
            <ThemedText style={styles.text}>
              •{" "}
              <ThemedText style={styles.bold}>React Native & Expo:</ThemedText>{" "}
              leveraging Expo Router for file-based routing.
            </ThemedText>
            <ThemedText style={styles.text}>
              •{" "}
              <ThemedText style={styles.bold}>
                React Query (TanStack):
              </ThemedText>{" "}
              for efficient data fetching, caching, and optimistic UI updates.
            </ThemedText>
            <ThemedText style={styles.text}>
              • <ThemedText style={styles.bold}>TypeScript:</ThemedText> strict
              typing across the entire codebase for enhanced reliability.
            </ThemedText>
            <ThemedText style={styles.text}>
              • <ThemedText style={styles.bold}>Jest & RNTL:</ThemedText>{" "}
              comprehensive unit and integration testing suite.
            </ThemedText>
            <ThemedText style={styles.text}>
              • <ThemedText style={styles.bold}>Maestro:</ThemedText> end-to-end
              automated testing for critical user paths.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle">Best Practices & Patterns</ThemedText>
            <ThemedText style={styles.text}>
              •{" "}
              <ThemedText style={styles.bold}>
                Surgical Context Optimization:
              </ThemedText>{" "}
              minimized re-renders by colocation of state and efficient query
              hooks.
            </ThemedText>
            <ThemedText style={styles.text}>
              • <ThemedText style={styles.bold}>Cache-First UI:</ThemedText>{" "}
              instant navigation using partial data from the list cache while
              background fetching details.
            </ThemedText>
            <ThemedText style={styles.text}>
              • <ThemedText style={styles.bold}>Custom Hooks:</ThemedText>{" "}
              abstracting complex logic like debouncing into reusable hooks.
            </ThemedText>
            <ThemedText style={styles.text}>
              •{" "}
              <ThemedText style={styles.bold}>
                Resilient Error Handling:
              </ThemedText>{" "}
              simulated 50% network failure rate with graceful UI fallbacks and
              retry mechanisms.
            </ThemedText>
            <ThemedText style={styles.text}>
              • <ThemedText style={styles.bold}>E2E Testability:</ThemedText>{" "}
              usage of stable `testID` props for robust automated testing.
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.section}>
            <ThemedText type="subtitle">Performance</ThemedText>
            <ThemedText style={styles.text}>
              Implemented search debouncing (250ms) to throttle API requests and
              optimized FlatList interaction with `keyboardShouldPersistTaps`
              for a seamless user experience.
            </ThemedText>
          </ThemedView>
        </ScrollView>
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
    paddingBottom: Spacing.five,
  },
  scrollContent: {
    padding: Spacing.four,
    gap: Spacing.four,
    paddingBottom: Spacing.six,
  },
  title: {
    marginBottom: Spacing.two,
  },
  section: {
    gap: Spacing.two,
    backgroundColor: "transparent",
  },
  text: {
    lineHeight: 24,
    fontSize: 16,
  },
  bold: {
    fontWeight: "700",
  },
});
