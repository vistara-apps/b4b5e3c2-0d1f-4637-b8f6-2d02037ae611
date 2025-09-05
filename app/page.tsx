'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { Header } from '@/components/Header';
import { RightsCard } from '@/components/RightsCard';
import { RecordButton } from '@/components/RecordButton';
import { ScriptButton } from '@/components/ScriptButton';
import { ShareButton } from '@/components/ShareButton';
import { LanguageSelector } from '@/components/LanguageSelector';
import { Dashboard } from '@/components/Dashboard';
import { STATE_GUIDES, SCRIPTS } from '@/lib/constants';
import { getCurrentLocation, generateId } from '@/lib/utils';
import { LocationData, StateGuide, Incident, Script } from '@/lib/types';
import { MapPin, Mic, MessageSquare, Share2, BarChart3, AlertCircle } from 'lucide-react';

export default function GuardiantApp() {
  const { setFrameReady } = useMiniKit();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'rights' | 'record' | 'scripts' | 'share'>('dashboard');
  const [language, setLanguage] = useState<'en' | 'es'>('en');
  const [location, setLocation] = useState<LocationData | null>(null);
  const [stateGuide, setStateGuide] = useState<StateGuide | null>(null);
  const [currentIncident, setCurrentIncident] = useState<Incident | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  // Initialize MiniKit
  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  // Get user location on mount
  useEffect(() => {
    const getLocation = async () => {
      setIsLocationLoading(true);
      try {
        const locationData = await getCurrentLocation();
        setLocation(locationData);
        
        // Get state guide for the location
        const guide = STATE_GUIDES[locationData.state];
        if (guide) {
          setStateGuide(guide);
        }
      } catch (error) {
        console.error('Failed to get location:', error);
      } finally {
        setIsLocationLoading(false);
      }
    };

    getLocation();
  }, []);

  const handleRecordingStart = () => {
    // Create new incident when recording starts
    const incident: Incident = {
      incidentId: generateId(),
      userId: 'demo-user', // In real app, get from auth
      timestamp: new Date(),
      location: location || {
        latitude: 0,
        longitude: 0,
        state: 'Unknown'
      },
      notes: '',
      rightsInfoSummary: stateGuide ? 
        `Rights in ${stateGuide.stateName}: ${stateGuide.rights.join(', ')}` : 
        'Location-based rights information not available',
      status: 'recording'
    };
    
    setCurrentIncident(incident);
  };

  const handleRecordingStop = (recordingUrl: string, duration: number) => {
    if (currentIncident) {
      const updatedIncident: Incident = {
        ...currentIncident,
        recordingUrl,
        duration,
        status: 'completed'
      };
      setCurrentIncident(updatedIncident);
      setActiveTab('share'); // Auto-switch to share tab
    }
  };

  const handleScriptUse = (script: Script) => {
    // In a real app, this might log the script usage or add to incident notes
    console.log('Script used:', script.title);
    
    if (currentIncident) {
      const updatedIncident: Incident = {
        ...currentIncident,
        notes: currentIncident.notes + `\nUsed script: ${script.title} - "${script.content[language]}"`
      };
      setCurrentIncident(updatedIncident);
    }
  };

  const tabs = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: BarChart3 },
    { id: 'rights' as const, label: 'Rights', icon: MapPin },
    { id: 'record' as const, label: 'Record', icon: Mic },
    { id: 'scripts' as const, label: 'Scripts', icon: MessageSquare },
    { id: 'share' as const, label: 'Share', icon: Share2 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <Header />

        {/* Language Selector */}
        <div className="flex justify-end mb-6">
          <LanguageSelector 
            currentLanguage={language}
            onLanguageChange={setLanguage}
          />
        </div>

        {/* Location Status */}
        {isLocationLoading && (
          <div className="glass-card p-4 mb-6 flex items-center space-x-3">
            <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
            <span className="text-white">Getting your location...</span>
          </div>
        )}

        {location && (
          <div className="glass-card p-4 mb-6 flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-green-400" />
            <span className="text-white">
              Current location: {location.city ? `${location.city}, ` : ''}{location.state}
            </span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="glass-card p-2 mb-6">
          <div className="flex space-x-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'dashboard' && <Dashboard />}

          {activeTab === 'rights' && (
            <div className="space-y-6">
              <RightsCard 
                variant="detailed"
                stateGuide={stateGuide}
                location={location?.state}
              />
              
              {!location && (
                <div className="glass-card p-6 text-center">
                  <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Location Access Needed
                  </h3>
                  <p className="text-gray-300 mb-4">
                    To provide accurate, state-specific rights information, we need access to your location.
                  </p>
                  <button 
                    onClick={() => window.location.reload()}
                    className="btn-primary"
                  >
                    Enable Location
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'record' && (
            <div className="space-y-6">
              <div className="glass-card p-8 text-center">
                <h2 className="text-2xl font-bold text-white mb-4">
                  Discreet Recording
                </h2>
                <p className="text-gray-300 mb-8">
                  Tap the button below to start recording your interaction. 
                  The recording will be saved securely on your device.
                </p>
                
                <RecordButton
                  variant="prominent"
                  onRecordingStart={handleRecordingStart}
                  onRecordingStop={handleRecordingStop}
                />
              </div>

              {currentIncident && (
                <div className="glass-card p-6">
                  <h3 className="font-semibold text-white mb-4">Current Incident</h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-300">
                      <span className="text-white">Started:</span> {currentIncident.timestamp.toLocaleTimeString()}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-white">Location:</span> {currentIncident.location.state}
                    </p>
                    <p className="text-gray-300">
                      <span className="text-white">Status:</span> {currentIncident.status}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'scripts' && (
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-2">
                  Scenario Scripts
                </h2>
                <p className="text-gray-300 mb-4">
                  Pre-written phrases to help you communicate clearly during interactions.
                </p>
              </div>

              <div className="grid gap-4">
                {SCRIPTS.map((script) => (
                  <ScriptButton
                    key={script.id}
                    script={script}
                    language={language}
                    variant="primary"
                    onUse={handleScriptUse}
                  />
                ))}
              </div>
            </div>
          )}

          {activeTab === 'share' && (
            <div className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-xl font-bold text-white mb-2">
                  Share Incident Summary
                </h2>
                <p className="text-gray-300">
                  Generate and share a summary of your interaction with trusted contacts or legal aid.
                </p>
              </div>

              <ShareButton
                incident={currentIncident}
                onShare={(method) => console.log('Shared via:', method)}
              />

              {!currentIncident && (
                <div className="glass-card p-6 text-center">
                  <Share2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    No Incident to Share
                  </h3>
                  <p className="text-gray-300">
                    Record an interaction first to generate a shareable summary.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Emergency Notice */}
        <div className="mt-8 glass-card p-4 border-l-4 border-red-400">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
            <div>
              <h4 className="font-medium text-white mb-1">Important Notice</h4>
              <p className="text-sm text-gray-300">
                This app provides general information and should not replace legal advice. 
                In emergencies, call 911. Always prioritize your safety.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
