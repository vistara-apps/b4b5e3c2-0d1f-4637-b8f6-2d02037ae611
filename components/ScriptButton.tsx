'use client';

import { useState } from 'react';
import { Copy, Volume2, Check } from 'lucide-react';
import { Script } from '@/lib/types';
import { copyToClipboard } from '@/lib/utils';

interface ScriptButtonProps {
  script: Script;
  language: 'en' | 'es';
  variant?: 'primary' | 'secondary';
  onUse?: (script: Script) => void;
}

export function ScriptButton({ 
  script, 
  language, 
  variant = 'primary',
  onUse 
}: ScriptButtonProps) {
  const [isCopied, setIsCopied] = useState(false);
  const [isReading, setIsReading] = useState(false);

  const content = script.content[language];

  const handleCopy = async () => {
    const success = await copyToClipboard(content);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.lang = language === 'es' ? 'es-ES' : 'en-US';
      utterance.rate = 0.8; // Slightly slower for clarity
      
      utterance.onstart = () => setIsReading(true);
      utterance.onend = () => setIsReading(false);
      utterance.onerror = () => setIsReading(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleUse = () => {
    if (onUse) {
      onUse(script);
    }
  };

  const buttonClass = variant === 'primary' 
    ? 'glass-card p-4 hover:bg-opacity-20 transition-all duration-200 text-left'
    : 'glass-card p-3 hover:bg-opacity-15 transition-all duration-200 text-left';

  return (
    <div className={buttonClass}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="font-medium text-white text-sm mb-1">
            {script.title}
          </h4>
          <p className="text-xs text-gray-400 mb-2">
            {script.scenario}
          </p>
        </div>
        
        <div className="flex items-center space-x-1 ml-2">
          <button
            onClick={handleCopy}
            className="p-1.5 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200"
            title="Copy to clipboard"
          >
            {isCopied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </button>
          
          <button
            onClick={handleSpeak}
            className={`p-1.5 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200 ${
              isReading ? 'text-blue-400' : 'text-gray-400'
            }`}
            title="Read aloud"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="bg-black bg-opacity-20 rounded-lg p-3 mb-3">
        <p className="text-white text-sm leading-relaxed">
          "{content}"
        </p>
      </div>
      
      <button
        onClick={handleUse}
        className="w-full btn-secondary text-sm py-2"
      >
        Use This Script
      </button>
    </div>
  );
}
