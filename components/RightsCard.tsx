'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, MapPin, AlertCircle } from 'lucide-react';
import { StateGuide } from '@/lib/types';

interface RightsCardProps {
  variant?: 'compact' | 'detailed';
  stateGuide?: StateGuide;
  location?: string;
}

export function RightsCard({ 
  variant = 'compact', 
  stateGuide,
  location = 'Unknown Location'
}: RightsCardProps) {
  const [isExpanded, setIsExpanded] = useState(variant === 'detailed');

  if (!stateGuide) {
    return (
      <div className="glass-card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertCircle className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">Rights Information</h3>
        </div>
        <p className="text-gray-300">
          Location access needed to provide state-specific rights information.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-blue-400" />
          <h3 className="text-lg font-semibold text-white">
            Your Rights in {stateGuide.stateName}
          </h3>
        </div>
        
        {variant === 'compact' && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-white" />
            ) : (
              <ChevronDown className="w-5 h-5 text-white" />
            )}
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-white mb-2">Your Basic Rights:</h4>
          <ul className="space-y-1">
            {stateGuide.rights.slice(0, isExpanded ? undefined : 3).map((right, index) => (
              <li key={index} className="text-sm text-gray-300 flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>{right}</span>
              </li>
            ))}
          </ul>
          {!isExpanded && stateGuide.rights.length > 3 && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-sm text-blue-400 hover:text-blue-300 mt-2"
            >
              Show {stateGuide.rights.length - 3} more rights...
            </button>
          )}
        </div>

        {isExpanded && (
          <>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-white mb-2 text-green-400">✓ DO:</h4>
                <ul className="space-y-1">
                  {stateGuide.dosAndDonts.dos.map((item, index) => (
                    <li key={index} className="text-sm text-gray-300">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-2 text-red-400">✗ DON'T:</h4>
                <ul className="space-y-1">
                  {stateGuide.dosAndDonts.donts.map((item, index) => (
                    <li key={index} className="text-sm text-gray-300">
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
