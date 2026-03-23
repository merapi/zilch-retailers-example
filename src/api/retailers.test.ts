import { fetchRetailers, fetchRetailerDetails, setMockRetailers } from './retailers';

describe('Retailer API', () => {
  let originalData: any;

  beforeAll(async () => {
    // Save original mock data to restore later
    originalData = await fetchRetailers();
  });

  it('allows overriding mock data for testing', async () => {
    const customData = [
      { id: '99', name: 'Zilch', category: 'Fintech', logo: 0, description: 'Buy now pay later', website: 'payzilch.com', cashback: 10 }
    ];
    setMockRetailers(customData as any);
    
    const retailers = await fetchRetailers();
    expect(retailers).toHaveLength(1);
    expect(retailers[0].name).toBe('Zilch');
    
    const details = await fetchRetailerDetails('99');
    expect(details.description).toBe('Buy now pay later');
    
    // Restore for other tests
    const fullMockData = Array.from({ length: 15 }).flatMap((_, i) => [
      { id: `${i * 8 + 1}`, name: i === 0 ? 'Amazon' : `Amazon ${i + 1}`, category: 'General', logo: 0, description: '...', website: 'amazon.com', cashback: 2 },
      { id: `${i * 8 + 2}`, name: i === 0 ? 'Ebay' : `Ebay ${i + 1}`, category: 'General', logo: 0, description: '...', website: 'ebay.com', cashback: 1.5 },
    ]);
    setMockRetailers(fullMockData as any);
  });

  it('fetchRetailers returns a list of retailers', async () => {
    const retailers = await fetchRetailers();
    expect(retailers.length).toBeGreaterThan(0);
    expect(retailers[0]).toHaveProperty('name');
    expect(retailers[0]).toHaveProperty('id');
  });

  it('fetchRetailers filters results by search query', async () => {
    const retailers = await fetchRetailers('Amazon');
    expect(retailers.every(r => r.name.toLowerCase().includes('amazon'))).toBe(true);
  });

  it('fetchRetailerDetails returns full retailer details', async () => {
    const details = await fetchRetailerDetails('1');
    expect(details.id).toBe('1');
    expect(details).toHaveProperty('description');
    expect(details).toHaveProperty('website');
    expect(details).toHaveProperty('cashback');
  });

  it('fetchRetailerDetails throws error for invalid id', async () => {
    await expect(fetchRetailerDetails('invalid')).rejects.toThrow('Retailer not found');
  });
});
