import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { latitude, longitude } = body;

    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    // In a real app, you would use a geocoding service like Google Maps API
    // For demo purposes, we'll use a simple state mapping based on coordinates
    const locationData = await reverseGeocode(latitude, longitude);

    return NextResponse.json({
      success: true,
      data: locationData
    });
  } catch (error) {
    console.error('Location API error:', error);
    return NextResponse.json(
      { error: 'Failed to process location' },
      { status: 500 }
    );
  }
}

async function reverseGeocode(latitude: number, longitude: number) {
  // Simple state mapping based on coordinates
  // In production, use a proper geocoding service
  const stateMapping = getStateFromCoordinates(latitude, longitude);
  
  return {
    latitude,
    longitude,
    state: stateMapping.state,
    city: stateMapping.city,
    accuracy: 'approximate',
    timestamp: new Date().toISOString()
  };
}

function getStateFromCoordinates(lat: number, lng: number) {
  // Simplified state detection based on coordinate ranges
  // This is a basic implementation - use proper geocoding in production
  
  // California
  if (lat >= 32.5 && lat <= 42.0 && lng >= -124.4 && lng <= -114.1) {
    return { state: 'California', city: 'Los Angeles' };
  }
  
  // New York
  if (lat >= 40.4 && lat <= 45.0 && lng >= -79.8 && lng <= -71.8) {
    return { state: 'New York', city: 'New York City' };
  }
  
  // Florida
  if (lat >= 25.8 && lat <= 31.0 && lng >= -87.6 && lng <= -79.8) {
    return { state: 'Florida', city: 'Miami' };
  }
  
  // Texas
  if (lat >= 25.8 && lat <= 36.5 && lng >= -106.6 && lng <= -93.5) {
    return { state: 'Texas', city: 'Houston' };
  }
  
  // Illinois
  if (lat >= 37.0 && lat <= 42.5 && lng >= -91.5 && lng <= -87.0) {
    return { state: 'Illinois', city: 'Chicago' };
  }
  
  // Pennsylvania
  if (lat >= 39.7 && lat <= 42.3 && lng >= -80.5 && lng <= -74.7) {
    return { state: 'Pennsylvania', city: 'Philadelphia' };
  }
  
  // Ohio
  if (lat >= 38.4 && lat <= 41.9 && lng >= -84.8 && lng <= -80.5) {
    return { state: 'Ohio', city: 'Columbus' };
  }
  
  // Georgia
  if (lat >= 30.4 && lat <= 35.0 && lng >= -85.6 && lng <= -80.8) {
    return { state: 'Georgia', city: 'Atlanta' };
  }
  
  // North Carolina
  if (lat >= 33.8 && lat <= 36.6 && lng >= -84.3 && lng <= -75.5) {
    return { state: 'North Carolina', city: 'Charlotte' };
  }
  
  // Michigan
  if (lat >= 41.6 && lat <= 47.1 && lng >= -90.6 && lng <= -82.4) {
    return { state: 'Michigan', city: 'Detroit' };
  }
  
  // New Jersey
  if (lat >= 38.9 && lat <= 41.4 && lng >= -75.6 && lng <= -73.9) {
    return { state: 'New Jersey', city: 'Newark' };
  }
  
  // Virginia
  if (lat >= 36.5 && lat <= 39.5 && lng >= -83.7 && lng <= -75.2) {
    return { state: 'Virginia', city: 'Richmond' };
  }
  
  // Washington
  if (lat >= 45.5 && lat <= 49.0 && lng >= -124.8 && lng <= -116.9) {
    return { state: 'Washington', city: 'Seattle' };
  }
  
  // Arizona
  if (lat >= 31.3 && lat <= 37.0 && lng >= -114.8 && lng <= -109.0) {
    return { state: 'Arizona', city: 'Phoenix' };
  }
  
  // Massachusetts
  if (lat >= 41.2 && lat <= 42.9 && lng >= -73.5 && lng <= -69.9) {
    return { state: 'Massachusetts', city: 'Boston' };
  }
  
  // Tennessee
  if (lat >= 35.0 && lat <= 36.7 && lng >= -90.3 && lng <= -81.6) {
    return { state: 'Tennessee', city: 'Nashville' };
  }
  
  // Indiana
  if (lat >= 37.8 && lat <= 41.8 && lng >= -88.1 && lng <= -84.8) {
    return { state: 'Indiana', city: 'Indianapolis' };
  }
  
  // Missouri
  if (lat >= 36.0 && lat <= 40.6 && lng >= -95.8 && lng <= -89.1) {
    return { state: 'Missouri', city: 'Kansas City' };
  }
  
  // Maryland
  if (lat >= 37.9 && lat <= 39.7 && lng >= -79.5 && lng <= -75.0) {
    return { state: 'Maryland', city: 'Baltimore' };
  }
  
  // Wisconsin
  if (lat >= 42.5 && lat <= 47.1 && lng >= -92.9 && lng <= -86.2) {
    return { state: 'Wisconsin', city: 'Milwaukee' };
  }
  
  // Colorado
  if (lat >= 37.0 && lat <= 41.0 && lng >= -109.1 && lng <= -102.0) {
    return { state: 'Colorado', city: 'Denver' };
  }
  
  // Default fallback
  return { state: 'Unknown', city: 'Unknown City' };
}

export async function GET() {
  return NextResponse.json({
    message: 'Location API endpoint',
    usage: 'POST with latitude and longitude to get location information',
    example: {
      latitude: 34.0522,
      longitude: -118.2437
    }
  });
}
