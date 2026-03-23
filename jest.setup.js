require('react-native-gesture-handler/jestSetup');

// Polyfill for Expo's runtime
global.__ExpoImportMetaRegistry = global.__ExpoImportMetaRegistry || {
  get: () => ({}),
  set: () => {},
};

if (typeof global.structuredClone !== 'function') {
  global.structuredClone = (obj) => JSON.parse(JSON.stringify(obj));
}

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

jest.mock('expo-router', () => ({
  router: {
    push: jest.fn(),
    back: jest.fn(),
  },
  useLocalSearchParams: jest.fn(() => ({ id: '1' })),
}));

// Mocking BottomSheet
jest.mock('@gorhom/bottom-sheet', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: View,
    BottomSheetModal: View,
    BottomSheetView: View,
    BottomSheetModalProvider: ({ children }) => children,
    BottomSheetBackdrop: View,
  };
});
