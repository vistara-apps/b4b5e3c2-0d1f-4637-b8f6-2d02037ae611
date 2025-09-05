'use client';

import { Shield, Menu } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  variant?: 'default';
}

export function Header({ variant = 'default' }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="glass-card p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Guardiant</h1>
            <p className="text-sm text-gray-300">Your Pocket Rights Advisor</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>
      
      {isMenuOpen && (
        <div className="mt-4 pt-4 border-t border-white border-opacity-20">
          <nav className="space-y-2">
            <a href="#rights" className="block px-3 py-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200">
              Rights Info
            </a>
            <a href="#scripts" className="block px-3 py-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200">
              Scripts
            </a>
            <a href="#incidents" className="block px-3 py-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200">
              My Incidents
            </a>
            <a href="#settings" className="block px-3 py-2 text-white hover:bg-white hover:bg-opacity-10 rounded-lg transition-colors duration-200">
              Settings
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
