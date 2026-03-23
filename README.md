# Zilch Retailers Example 💳

A high-performance React Native Master-Detail showcase built with Expo, demonstrating Staff-level architectural patterns, resilient data fetching, and a comprehensive testing suite.

<div align="center">
  <video src="https://github.com/user-attachments/assets/70a83e32-93c4-4094-ae52-3fbe23d88542" width="100%" style="max-width: 800px;" autoplay loop muted playsinline>
  </video>
</div>

## 🚀 Key Features

- **Master-Detail Flow**: Seamless navigation between a list of 120+ retailers and their full details.
- **Cache-First UI**: Uses TanStack Query to instantly show partial data from the list cache while background-fetching extra details.
- **Resilient API Layer**: Simulated 50% network failure rate with graceful UI fallbacks and retry mechanisms (retry disabled in this demo).
- **Optimized Search**: Debounced search input (250ms) to throttle API requests.
- **Keyboard Optimization**: Seamless list interaction using `keyboardShouldPersistTaps`.
- **E2E Testability**: Usage of stable `testID` props across critical components.

## 🛠 Tech Stack

- **Framework**: React Native with [Expo](https://expo.dev)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (File-based)
- **State & Data**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: Custom Themed components with Light/Dark mode support.

## 🧪 Testing Pyramid

- **Unit & Integration**: Jest & [React Native Testing Library](https://callstack.github.io/react-native-testing-library/) (12+ tests passing).
- **End-to-End**: [Maestro](https://maestro.mobile.dev/) for "Golden Path" automation.

## 🏃 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the App

```bash
npx expo start
```

### 3. Run Jest Tests

```bash
npm test
```

### 4. Run Maestro E2E

```bash
# Start with simulation disabled for clean E2E run
EXPO_PUBLIC_API_SIMULATION_DISABLED=true npx expo start

# In another terminal
maestro test .maestro/golden-path.yaml
```

## 📝 Best Practices Implemented

- **Surgical Context Optimization**: Minimized re-renders by colocation of state.
- **Clean Types**: Centralized TypeScript definitions in `src/types/`.
- **Custom Hooks**: Abstracted complex logic (Debounce, Theme) into reusable hooks.
- **Asset Management**: High-resolution local PNG assets for consistent performance.
