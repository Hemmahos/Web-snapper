
import React, { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { toast } from 'sonner';
import URLInput from '@/components/URLInput';
import DeviceSelector from '@/components/DeviceSelector';
import CustomDimensions from '@/components/CustomDimensions';
import ActionButton from '@/components/ActionButton';
import ResultDisplay from '@/components/ResultDisplay';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { DevicePreset, ScreenshotResult } from '@/lib/types';
import { DEVICE_PRESETS, DEFAULT_DEVICE, URL_REGEX } from '@/lib/constants';

const Index = () => {
  const [url, setUrl] = useState('');
  const [selectedDevice, setSelectedDevice] = useState<DevicePreset>(DEFAULT_DEVICE);
  const [customWidth, setCustomWidth] = useState(1280);
  const [customHeight, setCustomHeight] = useState(800);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScreenshotResult | null>(null);

  const { toast: uiToast } = useToast();

  const handleDeviceSelect = useCallback((device: DevicePreset) => {
    setSelectedDevice(device);
    if (device.id !== 'custom' && device.width && device.height) {
      setCustomWidth(device.width);
      setCustomHeight(device.height);
    }
  }, []);

  const isCustom = selectedDevice.id === 'custom';

  const getEffectiveWidth = () => isCustom ? customWidth : selectedDevice.width;
  const getEffectiveHeight = () => isCustom ? customHeight : selectedDevice.height;

  const isFormValid = () => {
    if (!url || !URL_REGEX.test(url)) return false;
    if (isCustom && (!customWidth || !customHeight)) return false;
    return true;
  };

  const prepareUrl = (inputUrl: string): string => {
    // Ensure URL starts with http:// or https://
    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
      return `https://${inputUrl}`;
    }
    return inputUrl;
  };

  const getImagePlaceholder = (width: number, height: number, websiteUrl: string): string => {
    // Use a reliable placeholder format with the correct path to public directory
    const encodedUrl = encodeURIComponent(websiteUrl);
    const timestamp = new Date().getTime(); // Add timestamp to avoid caching
    return `/placeholder.svg?width=${width}&height=${height}&text=${encodedUrl}&t=${timestamp}`;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      toast.error('Please enter a valid URL and dimensions');
      return;
    }
    
    setIsLoading(true);
    setResult(null);
    
    try {
      // In a real implementation, this would call an API to get the screenshot
      // Here we're simulating the API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const formattedUrl = prepareUrl(url);
      const width = getEffectiveWidth();
      const height = getEffectiveHeight();
      
      console.log("Creating screenshot for:", formattedUrl, width, height);
      
      // Create a result with a placeholder image
      const placeholderUrl = getImagePlaceholder(width, height, formattedUrl);
      console.log("Using placeholder URL:", placeholderUrl);
      
      const mockResult: ScreenshotResult = {
        imageUrl: placeholderUrl,
        width: width,
        height: height,
        url: formattedUrl,
        timestamp: Date.now(),
      };
      
      setResult(mockResult);
      toast.success('Screenshot captured successfully!');
    } catch (error) {
      console.error('Error capturing screenshot:', error);
      uiToast({
        variant: "destructive",
        title: "Error",
        description: "Failed to capture screenshot. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/30">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center py-16 px-4 mt-12">
        <div className="w-full max-w-3xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">
              Capture Website Screenshots
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Instantly create high-quality screenshots of any website for your Figma designs.
            </p>
          </div>
          
          <div className="glass-card rounded-xl p-6 shadow-elevated animate-slide-up">
            <div className="space-y-6">
              <URLInput 
                value={url}
                onChange={setUrl}
                onSubmit={isFormValid() ? handleSubmit : undefined}
              />
              
              <DeviceSelector 
                selectedDevice={selectedDevice} 
                onSelect={handleDeviceSelect} 
              />
              
              <CustomDimensions 
                width={customWidth}
                height={customHeight}
                onWidthChange={setCustomWidth}
                onHeightChange={setCustomHeight}
                isVisible={isCustom}
              />
              
              <div className="pt-2">
                <ActionButton 
                  onClick={handleSubmit} 
                  isLoading={isLoading}
                  isDisabled={!isFormValid()}
                />
              </div>
            </div>
          </div>
          
          <ResultDisplay result={result} isLoading={isLoading} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
