
export interface DevicePreset {
  id: string;
  name: string;
  width: number;
  height: number;
  icon: string;
}

export interface ScreenshotParams {
  url: string;
  width: number;
  height: number;
}

export interface ScreenshotResult {
  imageUrl: string;
  width: number;
  height: number;
  url: string;
  timestamp: number;
}
