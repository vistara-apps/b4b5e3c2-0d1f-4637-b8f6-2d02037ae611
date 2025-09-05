'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, Square, Play, Pause } from 'lucide-react';
import { formatDuration, supportsMediaRecording, requestMediaPermissions } from '@/lib/utils';
import { RecordingState } from '@/lib/types';

interface RecordButtonProps {
  variant?: 'prominent' | 'discreet';
  onRecordingStart?: () => void;
  onRecordingStop?: (recordingUrl: string, duration: number) => void;
}

export function RecordButton({ 
  variant = 'prominent',
  onRecordingStart,
  onRecordingStop
}: RecordButtonProps) {
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    duration: 0,
    hasPermission: false
  });
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if media recording is supported
    if (!supportsMediaRecording()) {
      console.warn('Media recording not supported in this browser');
    }
  }, []);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (mediaRecorderRef.current && recordingState.isRecording) {
        mediaRecorderRef.current.stop();
      }
    };
  }, [recordingState.isRecording]);

  const startRecording = async () => {
    try {
      // Request permissions
      const hasPermission = await requestMediaPermissions();
      if (!hasPermission) {
        alert('Microphone permission is required for recording');
        return;
      }

      // Get media stream
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: true, 
        video: false // Audio only for discretion
      });

      // Create MediaRecorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        
        if (onRecordingStop) {
          onRecordingStop(url, recordingState.duration);
        }

        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      // Start recording
      mediaRecorder.start();
      
      const startTime = new Date();
      setRecordingState({
        isRecording: true,
        startTime,
        duration: 0,
        hasPermission: true
      });

      // Start duration timer
      intervalRef.current = setInterval(() => {
        setRecordingState(prev => ({
          ...prev,
          duration: Math.floor((Date.now() - startTime.getTime()) / 1000)
        }));
      }, 1000);

      if (onRecordingStart) {
        onRecordingStart();
      }

    } catch (error) {
      console.error('Failed to start recording:', error);
      alert('Failed to start recording. Please check your microphone permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recordingState.isRecording) {
      mediaRecorderRef.current.stop();
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      setRecordingState(prev => ({
        ...prev,
        isRecording: false
      }));
    }
  };

  const toggleRecording = () => {
    if (recordingState.isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  if (variant === 'discreet') {
    return (
      <button
        onClick={toggleRecording}
        className={`p-3 rounded-full transition-all duration-200 ${
          recordingState.isRecording 
            ? 'bg-red-500 hover:bg-red-600 recording-pulse' 
            : 'glass-card hover:bg-opacity-20'
        }`}
        title={recordingState.isRecording ? 'Stop Recording' : 'Start Recording'}
      >
        {recordingState.isRecording ? (
          <Square className="w-5 h-5 text-white" />
        ) : (
          <Mic className="w-5 h-5 text-white" />
        )}
      </button>
    );
  }

  return (
    <div className="text-center space-y-4">
      <button
        onClick={toggleRecording}
        className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-200 ${
          recordingState.isRecording 
            ? 'bg-red-500 hover:bg-red-600 recording-pulse shadow-lg shadow-red-500/30' 
            : 'btn-primary shadow-lg shadow-purple-500/30'
        }`}
      >
        {recordingState.isRecording ? (
          <Square className="w-8 h-8 text-white" />
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}
      </button>
      
      <div className="space-y-2">
        <p className="text-white font-medium">
          {recordingState.isRecording ? 'Recording...' : 'Tap to Record'}
        </p>
        
        {recordingState.isRecording && (
          <div className="text-center">
            <span className="text-2xl font-mono text-white">
              {formatDuration(recordingState.duration)}
            </span>
          </div>
        )}
        
        {!recordingState.isRecording && recordingState.duration > 0 && (
          <p className="text-sm text-gray-300">
            Last recording: {formatDuration(recordingState.duration)}
          </p>
        )}
      </div>
    </div>
  );
}
