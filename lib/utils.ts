import { LocationData } from './types';

// Format duration in seconds to MM:SS format
export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Get user's current location
export async function getCurrentLocation(): Promise<LocationData> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        
        try {
          // In a real app, you'd use a geocoding service to get state/city
          // For demo purposes, we'll use a simple mapping
          const state = await getStateFromCoordinates(latitude, longitude);
          
          resolve({
            latitude,
            longitude,
            state,
            accuracy
          });
        } catch (error) {
          reject(error);
        }
      },
      (error) => {
        reject(new Error(`Location error: ${error.message}`));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
}

// Simple state detection based on coordinates (demo implementation)
async function getStateFromCoordinates(lat: number, lng: number): Promise<string> {
  // This is a simplified implementation
  // In production, you'd use a proper geocoding service
  if (lat >= 32.5 && lat <= 42 && lng >= -124 && lng <= -114) {
    return 'California';
  } else if (lat >= 40.5 && lat <= 45 && lng >= -79.8 && lng <= -71.8) {
    return 'New York';
  } else {
    return 'Unknown';
  }
}

// Generate a unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Format timestamp for display
export function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

// Check if browser supports media recording
export function supportsMediaRecording(): boolean {
  return typeof MediaRecorder !== 'undefined' && 
         typeof navigator !== 'undefined' && 
         navigator.mediaDevices && 
         typeof navigator.mediaDevices.getUserMedia === 'function';
}

// Request media permissions
export async function requestMediaPermissions(): Promise<boolean> {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ 
      audio: true, 
      video: false // Start with audio only for discretion
    });
    
    // Stop the stream immediately after getting permission
    stream.getTracks().forEach(track => track.stop());
    return true;
  } catch (error) {
    console.error('Media permission denied:', error);
    return false;
  }
}

// Copy text to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Failed to copy to clipboard:', error);
    return false;
  }
}
