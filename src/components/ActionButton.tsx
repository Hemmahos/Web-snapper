
import React from 'react';
import { Camera, Loader2 } from 'lucide-react';

interface ActionButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  onClick, 
  isLoading = false, 
  isDisabled = false 
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled || isLoading}
      className={`
        relative w-full md:w-auto flex items-center justify-center space-x-2 
        px-5 py-3 rounded-lg font-medium text-sm shadow-button
        transition-all duration-300 ease-out transform hover:translate-y-[-1px] 
        active:translate-y-[1px] overflow-hidden
        ${isDisabled 
          ? 'bg-muted text-muted-foreground cursor-not-allowed' 
          : 'bg-primary text-primary-foreground hover:bg-primary/90'}
      `}
    >
      {/* Button background with subtle gradient and animation */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary opacity-100 transition-opacity duration-300"></div>
      
      {/* Button content */}
      <div className="relative flex items-center justify-center space-x-2 z-10">
        {isLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Camera className="h-5 w-5" />
        )}
        <span>{isLoading ? 'Processing...' : 'Get Screenshot'}</span>
      </div>
    </button>
  );
};

export default ActionButton;
