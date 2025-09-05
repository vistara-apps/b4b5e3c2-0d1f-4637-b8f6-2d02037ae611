// User data model
export interface User {
  userId: string;
  farcasterId?: string;
  walletAddress?: string;
  preferredLanguage: 'en' | 'es';
  savedStates: string[];
}

// Incident data model
export interface Incident {
  incidentId: string;
  userId: string;
  timestamp: Date;
  location: {
    latitude: number;
    longitude: number;
    state: string;
    city?: string;
  };
  recordingUrl?: string;
  notes: string;
  rightsInfoSummary: string;
  duration?: number;
  status: 'recording' | 'completed' | 'shared';
}

// State guide data model
export interface StateGuide {
  stateName: string;
  rights: string[];
  dosAndDonts: {
    dos: string[];
    donts: string[];
  };
  scripts: Script[];
}

// Script data model
export interface Script {
  id: string;
  scenario: string;
  title: string;
  content: {
    en: string;
    es: string;
  };
  category: 'consent' | 'identification' | 'search' | 'arrest' | 'general';
}

// Recording state
export interface RecordingState {
  isRecording: boolean;
  startTime?: Date;
  duration: number;
  hasPermission: boolean;
}

// Location data
export interface LocationData {
  latitude: number;
  longitude: number;
  state: string;
  city?: string;
  accuracy?: number;
}
