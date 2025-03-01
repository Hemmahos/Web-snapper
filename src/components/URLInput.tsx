
import React, { useState, useEffect } from 'react';
import { Globe, X } from 'lucide-react';
import { URL_REGEX } from '../lib/constants';

interface URLInputProps {
  value: string;
  onChange: (url: string) => void;
  onSubmit?: () => void;
}

const URLInput: React.FC<URLInputProps> = ({ value, onChange, onSubmit }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (value) {
      setIsValid(URL_REGEX.test(value));
    } else {
      setIsValid(true);
    }
  }, [value]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValid && value && onSubmit) {
      onSubmit();
    }
  };

  const clearInput = () => {
    onChange('');
  };

  return (
    <div className="w-full">
      <label htmlFor="url-input" className="block text-sm font-medium text-muted-foreground mb-2">
        Website URL
      </label>
      <div 
        className={`
          flex items-center w-full rounded-lg border ${isFocused ? 'border-primary ring-2 ring-primary/20' : 'border-input'} 
          ${!isValid && value ? 'border-destructive ring-2 ring-destructive/20' : ''}
          bg-background px-3 py-2 shadow-sm transition-all-200
        `}
      >
        <Globe className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
        <input
          id="url-input"
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="https://example.com"
          className="flex-grow bg-transparent outline-none text-foreground placeholder:text-muted-foreground text-sm py-1"
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            onClick={clearInput}
            className="text-muted-foreground hover:text-foreground transition-all-200 flex-shrink-0"
            aria-label="Clear input"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      {!isValid && value && (
        <p className="text-destructive text-xs mt-1 animate-slide-down">
          Please enter a valid URL (e.g., https://example.com)
        </p>
      )}
    </div>
  );
};

export default URLInput;
