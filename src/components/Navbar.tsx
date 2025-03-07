
import React from 'react';
import { Monitor } from 'lucide-react';
import WalletConnect from './WalletConnect';

const Navbar: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-white/50 backdrop-blur-md border-b border-border fixed top-0 left-0 right-0 z-50 transition-all-300">
      <div className="flex items-center space-x-2">
        <Monitor className="h-5 w-5 text-primary" />
        <span className="font-semibold text-lg">WebSnapper</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-sm font-medium hover:text-primary transition-all-200">Home</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-all-200">Features</a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-all-200">About</a>
        </nav>
        <WalletConnect />
      </div>
    </header>
  );
};

export default Navbar;
