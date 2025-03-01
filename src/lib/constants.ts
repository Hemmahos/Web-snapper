
import { DevicePreset } from './types';

export const DEVICE_PRESETS: DevicePreset[] = [
  {
    id: 'desktop-large',
    name: 'Desktop (1920)',
    width: 1920,
    height: 1080,
    icon: 'monitor',
  },
  {
    id: 'desktop',
    name: 'Desktop (1440)',
    width: 1440,
    height: 900,
    icon: 'monitor',
  },
  {
    id: 'tablet',
    name: 'Tablet (768)',
    width: 768,
    height: 1024,
    icon: 'tablet',
  },
  {
    id: 'mobile',
    name: 'Mobile (390)',
    width: 390,
    height: 844,
    icon: 'smartphone',
  },
  {
    id: 'custom',
    name: 'Custom',
    width: 0,
    height: 0,
    icon: 'settings',
  },
];

export const DEFAULT_DEVICE = DEVICE_PRESETS[1]; // Desktop 1440

// URL validation regex
export const URL_REGEX = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
