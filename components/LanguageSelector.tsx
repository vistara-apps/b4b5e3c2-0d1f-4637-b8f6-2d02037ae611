'use client';

import { useState } from 'react';
import { Globe, Check } from 'lucide-react';

interface LanguageSelectorProps {
  currentLanguage: 'en' | 'es';
  onLanguageChange: (language: 'en' | 'es') => void;
  variant?: 'default';
}

export function LanguageSelector({ 
  currentLanguage, 
  onLanguageChange, 
  variant = 'default' 
}: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en' as const, name: 'English', flag: '🇺🇸' },
    { code: 'es' as const, name: 'Español', flag: '🇪🇸' }
  ];

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  const handleLanguageSelect = (langCode: 'en' | 'es') => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass-card px-4 py-2 flex items-center space-x-2 hover:bg-opacity-20 transition-all duration-200"
      >
        <Globe className="w-4 h-4 text-white" />
        <span className="text-white text-sm">
          {currentLang?.flag} {currentLang?.name}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 glass-card p-2 min-w-full z-10">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              className="w-full px-3 py-2 text-left hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200 flex items-center justify-between"
            >
              <span className="text-white text-sm flex items-center space-x-2">
                <span>{language.flag}</span>
                <span>{language.name}</span>
              </span>
              {currentLanguage === language.code && (
                <Check className="w-4 h-4 text-green-400" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
