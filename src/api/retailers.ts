import { Retailer, RetailerDetail } from "@/types/retailer";

const baseMockRetailers: RetailerDetail[] = [
  {
    id: "1",
    name: "Amazon",
    category: "General",
    logo: require("@/assets/images/retailers/amazon.png"),
    description: "Everything from A to Z",
    website: "amazon.com",
    cashback: 2.0,
  },
  {
    id: "2",
    name: "Ebay",
    category: "General",
    logo: require("@/assets/images/retailers/ebay.png"),
    description: "Buy and sell anything",
    website: "ebay.com",
    cashback: 1.5,
  },
  {
    id: "3",
    name: "Nike",
    category: "Clothing",
    logo: require("@/assets/images/retailers/nike.png"),
    description: "Just do it",
    website: "nike.com",
    cashback: 5.0,
  },
  {
    id: "4",
    name: "Adidas",
    category: "Clothing",
    logo: require("@/assets/images/retailers/adidas.png"),
    description: "Impossible is nothing",
    website: "adidas.com",
    cashback: 4.5,
  },
  {
    id: "5",
    name: "Asos",
    category: "Clothing",
    logo: require("@/assets/images/retailers/asos.png"),
    description: "Discover fashion online",
    website: "asos.com",
    cashback: 3.0,
  },
  {
    id: "6",
    name: "Apple",
    category: "Electronics",
    logo: require("@/assets/images/retailers/apple.png"),
    description: "Think different",
    website: "apple.com",
    cashback: 1.0,
  },
  {
    id: "7",
    name: "Best Buy",
    category: "Electronics",
    logo: require("@/assets/images/retailers/bestbuy.png"),
    description: "Expert service. Unbeatable price.",
    website: "bestbuy.com",
    cashback: 2.5,
  },
  {
    id: "8",
    name: "Target",
    category: "General",
    logo: require("@/assets/images/retailers/target.png"),
    description: "Expect more. Pay less.",
    website: "target.com",
    cashback: 2.0,
  },
];

let mockRetailers: RetailerDetail[] = Array.from({ length: 15 }).flatMap(
  (_, i) =>
    baseMockRetailers.map((r) => ({
      ...r,
      id: `${i * baseMockRetailers.length + parseInt(r.id)}`,
      name: i === 0 ? r.name : `${r.name} ${i + 1}`,
    })),
);

/**
 * Helper for tests to override the mock data
 */
export const setMockRetailers = (data: RetailerDetail[]) => {
  mockRetailers = data;
};

const isSimulationDisabled =
  process.env.NODE_ENV === "test" ||
  process.env.EXPO_PUBLIC_API_SIMULATION_DISABLED === "true";

const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, isSimulationDisabled ? 0 : ms));

const simulateNetworkIssue = () => {
  if (isSimulationDisabled) return;
  if (Math.random() < 0.5) {
    throw new Error("Network Error: Simulated connection failure");
  }
};

export const fetchRetailers = async (
  searchQuery: string = "",
): Promise<Retailer[]> => {
  await delay(1000);
  simulateNetworkIssue();
  const q = searchQuery.toLowerCase();
  const results = mockRetailers.filter((r) => r.name.toLowerCase().includes(q));
  return results.map(({ id, name, category, logo }) => ({
    id,
    name,
    category,
    logo,
  }));
};

export const fetchRetailerDetails = async (
  id: string,
): Promise<RetailerDetail> => {
  await delay(1000);
  simulateNetworkIssue();
  const retailer = mockRetailers.find((r) => r.id === id);
  if (!retailer) {
    throw new Error("Retailer not found");
  }
  return retailer;
};
