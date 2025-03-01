
import React from 'react';
import { ArrowsMaximize, ArrowsMinimize } from 'lucide-react';

interface CustomDimensionsProps {
  width: number;
  height: number;
  onWidthChange: (width: number) => void;
  onHeightChange: (height: number) => void;
  isVisible: boolean;
}

const CustomDimensions: React.FC<CustomDimensionsProps> = ({
  width,
  height,
  onWidthChange,
  onHeightChange,
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="w-full mt-3 bg-secondary/50 rounded-lg p-4 animate-fade-in">
      <div className="text-sm font-medium text-muted-foreground mb-2">Custom Dimensions</div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="width-input" className="block text-xs text-muted-foreground mb-1">
            Width (px)
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <ArrowsMaximize className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              id="width-input"
              type="number"
              min="100"
              max="3840"
              value={width || ''}
              onChange={(e) => onWidthChange(Number(e.target.value))}
              className="w-full rounded-md border border-input bg-background pl-9 py-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all-200"
              placeholder="Width"
            />
          </div>
        </div>
        <div className="flex-1">
          <label htmlFor="height-input" className="block text-xs text-muted-foreground mb-1">
            Height (px)
          </label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <ArrowsMinimize className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              id="height-input"
              type="number"
              min="100"
              max="3840"
              value={height || ''}
              onChange={(e) => onHeightChange(Number(e.target.value))}
              className="w-full rounded-md border border-input bg-background pl-9 py-2 text-sm shadow-sm focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all-200"
              placeholder="Height"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDimensions;
