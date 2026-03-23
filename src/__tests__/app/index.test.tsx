import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import HomeScreen from "../../app/(tabs)/index";

// Create a new QueryClient for each test
const createTestQueryClient = () =>
  new QueryClient({
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

// We need to mock the API calls since they are async and include random failures. This way we can control the data returned and test the UI behavior accordingly.
jest.mock("@/api/retailers", () => ({
  fetchRetailers: jest.fn(async (q) => {
    const data = [
      { id: "1", name: "Amazon", category: "General", logo: 0 },
      { id: "2", name: "Ebay", category: "General", logo: 0 },
    ];
    if (!q) return data;
    return data.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()));
  }),
}));

describe("HomeScreen (Master Page)", () => {
  it("renders the retailers list correctly", async () => {
    const { getByText, getByPlaceholderText } = render(<HomeScreen />, {
      wrapper,
    });

    // Check if title is present
    expect(getByText("Retailers")).toBeTruthy();

    // Check if search input is present
    expect(getByPlaceholderText("Search retailers...")).toBeTruthy();

    // Wait for the data to load and check if items are rendered
    await waitFor(() => {
      expect(getByText("Amazon")).toBeTruthy();
      expect(getByText("Ebay")).toBeTruthy();
    });
  });

  it("filters retailers list based on search input", async () => {
    const { getByText, queryAllByText, getByPlaceholderText } = render(
      <HomeScreen />,
      { wrapper },
    );

    await waitFor(() => expect(getByText("Amazon")).toBeTruthy());

    const searchInput = getByPlaceholderText("Search retailers...");

    // Type 'Ama' in the search bar
    fireEvent.changeText(searchInput, "Ama");

    // Wait for debounce and filtered results
    await waitFor(
      () => {
        // Find elements that actually have text content
        const amazonElements = queryAllByText("Amazon");
        expect(amazonElements.length).toBeGreaterThan(0);

        const ebayElements = queryAllByText("Ebay");
        expect(ebayElements).toHaveLength(0);
      },
      { timeout: 5000 },
    );
  });

  it("clears the search input when the clear button is pressed", async () => {
    const { getByPlaceholderText, getByTestId, queryByTestId } = render(
      <HomeScreen />,
      { wrapper },
    );

    const searchInput = getByPlaceholderText("Search retailers...");

    // Button should not be present initially
    expect(queryByTestId("clear-search-button")).toBeNull();

    // Type something
    fireEvent.changeText(searchInput, "Test");

    // Button should appear
    const clearButton = getByTestId("clear-search-button");
    expect(clearButton).toBeTruthy();

    // Press clear
    fireEvent.press(clearButton);

    // Input should be empty
    expect(searchInput.props.value).toBe("");

    // Button should disappear
    expect(queryByTestId("clear-search-button")).toBeNull();
  });
});
