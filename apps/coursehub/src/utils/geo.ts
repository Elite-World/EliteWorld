// Haversine formula to calculate the distance between two points in km
export function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Mock Geocoder: Translates a search string to rough coordinates.
// If it cannot find a match, returns null.
export function geocodeLocation(query: string): { lat: number; lng: number } | null {
  const normalizedQuery = query.toLowerCase();

  const mockDb: Record<string, { lat: number; lng: number }> = {
    'san francisco': { lat: 37.7749, lng: -122.4194 },
    'silicon valley': { lat: 37.3875, lng: -122.0575 },
    'london': { lat: 51.5074, lng: -0.1278 },
    'madrid': { lat: 40.4168, lng: -3.7038 },
    'paris': { lat: 48.8566, lng: 2.3522 },
    'colorado': { lat: 39.5501, lng: -105.7821 },
    'new york': { lat: 40.7128, lng: -74.0060 },
    'florida': { lat: 27.9944, lng: -81.7603 },
  };

  for (const [key, coords] of Object.entries(mockDb)) {
    if (normalizedQuery.includes(key)) {
      return coords;
    }
  }

  return null; // Let the caller decide what to do (e.g. fallback to default or show all without sorting)
}
