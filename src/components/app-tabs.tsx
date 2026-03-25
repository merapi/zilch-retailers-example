import { NativeTabs } from "expo-router/unstable-native-tabs";
import React from "react";
import { useColorScheme } from "react-native";

import { Colors } from "@/constants/theme";

export default function AppTabs() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      iconColor={{ selected: colors.primary, default: colors.tabIconDefault }}
      labelStyle={{
        default: { color: colors.tabIconDefault },
        selected: { color: colors.primary },
      }}
      rippleColor={`${colors.primary}1A`}
      // Nice feature (WoW effect) but currently not working, NativeTabs don't support FlatList, only ScrollView works ATM.
      // See: https://docs.expo.dev/router/advanced/native-tabs/#limited-support-for-flatlist
      minimizeBehavior="onScrollDown"
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Retailers</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="storefront.fill"
          md="storefront"
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="about">
        <NativeTabs.Trigger.Label>About</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          sf="info.circle.fill"
          md="info"
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
