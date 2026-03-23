import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import RetailerDetailScreen from "../../app/retailer/[id]";

// Create a new QueryClient for each test
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={createTestQueryClient()}>
    {children}
  </QueryClientProvider>
);

// Mocking the API
jest.mock('@/api/retailers', () => ({
  fetchRetailerDetails: jest.fn(async (id) => ({
    id: '1',
    name: 'Amazon',
    category: 'General',
    logo: 0,
    description: 'Amazon details',
    website: 'amazon.com',
    cashback: 5,
  })),
}));

describe('RetailerDetailScreen', () => {
  it('renders retailer details correctly', async () => {
    const { getByText } = render(<RetailerDetailScreen />, { wrapper });

    // Wait for the detailed data to load
    await waitFor(() => {
      expect(getByText('Amazon')).toBeTruthy();
      expect(getByText('Amazon details')).toBeTruthy();
      expect(getByText('amazon.com')).toBeTruthy();
      expect(getByText('5%')).toBeTruthy();
    });
  });
});
