// Mock data - replace with real API calls
const mockData = {
    city: {
      london: [
        { id: 1, name: "LondonCreator1", followers: "50K" },
        { id: 2, name: "LondonCreator2", followers: "120K" }
      ],
      paris: [
        { id: 3, name: "ParisCreator1", followers: "80K" }
      ]
    },
    country: {
      uk: [
        { id: 4, name: "UKCreator1", followers: "250K" }
      ]
    },
    platform: {
      instagram: [
        { id: 5, name: "InstaStar", followers: "1.2M" }
      ]
    }
  };
  
  export async function getInfluencerData(type, location) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return mockData[type]?.[location] || null;
  }