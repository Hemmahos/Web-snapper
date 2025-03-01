
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 px-6 bg-white/50 backdrop-blur-md border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} WebSnapper. All rights reserved.
        </p>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-all-200">
            Terms
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-all-200">
            Privacy
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-all-200">
            Help
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
