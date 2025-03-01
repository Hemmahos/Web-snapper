
import React from 'react';
import { DevicePreset } from '../lib/types';
import { DEVICE_PRESETS } from '../lib/constants';
import { Monitor, Tablet, Smartphone, Settings } from 'lucide-react';

interface DeviceSelectorProps {
  selectedDevice: DevicePreset;
  onSelect: (device: DevicePreset) => void;
}

const DeviceSelector: React.FC<DeviceSelectorProps> = ({ selectedDevice, onSelect }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'monitor':
        return <Monitor className="h-4 w-4" />;
      case 'tablet':
        return <Tablet className="h-4 w-4" />;
      case 'smartphone':
        return <Smartphone className="h-4 w-4" />;
      case 'settings':
        return <Settings className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-muted-foreground mb-2">
        Device Type
      </label>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {DEVICE_PRESETS.map((device) => (
          <button
            key={device.id}
            type="button"
            onClick={() => onSelect(device)}
            className={`
              flex items-center justify-center space-x-2 p-3 rounded-lg border text-sm font-medium
              transition-all-200 hover:shadow-soft
              ${selectedDevice.id === device.id 
                ? 'bg-primary text-primary-foreground border-primary' 
                : 'bg-background hover:bg-secondary text-foreground border-input'}
            `}
          >
            {getIcon(device.icon)}
            <span>{device.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DeviceSelector;
