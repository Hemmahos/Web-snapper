
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

// Add Ethereum window type
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}
