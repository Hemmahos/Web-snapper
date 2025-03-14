
import React, { useState } from 'react';
import { ScreenshotResult } from '../lib/types';
import { Download, Copy, LinkIcon, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

interface ResultDisplayProps {
  result: ScreenshotResult | null;
  isLoading?: boolean;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, isLoading = false }) => {
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  if (isLoading) {
    return (
      <div className="w-full mt-8 h-64 flex items-center justify-center border-2 border-dashed border-border rounded-lg bg-secondary/30">
        <div className="flex flex-col items-center animate-pulse-soft">
          <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
          <p className="text-sm text-muted-foreground">Capturing website...</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="w-full mt-8 h-64 flex items-center justify-center border-2 border-dashed border-border rounded-lg bg-secondary/30">
        <div className="flex flex-col items-center">
          <Camera className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">Enter a URL and click "Get Screenshot" to begin</p>
        </div>
      </div>
    );
  }

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(`${label} copied!`);
      toast.success(`${label} copied to clipboard`);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      setCopySuccess('Copy failed');
      toast.error('Failed to copy to clipboard');
      setTimeout(() => setCopySuccess(null), 2000);
    }
  };

  const handleDownload = () => {
    try {
      // Create an anchor element but don't attach it to the DOM
      const link = document.createElement('a');
      
      // For local files in the public directory, use a direct path
      link.href = result.imageUrl;
      
      // Set a default filename
      const filename = `screenshot-${new Date().getTime()}.png`;
      link.setAttribute('download', filename);
      
      // Programmatically click the link to trigger download
      document.body.appendChild(link);
      link.click();
      
      // Clean up after download is initiated
      setTimeout(() => {
        document.body.removeChild(link);
      }, 100);
      
      toast.success('Screenshot download started');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download screenshot');
    }
  };

  const handleImageLoad = () => {
    console.log('Image loaded successfully:', result.imageUrl);
    setIsImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    console.error('Image failed to load from URL:', result.imageUrl);
    setImageError(true);
    setIsImageLoading(false);
  };

  return (
    <div className="w-full mt-8 animate-fade-in">
      <div className="flex flex-col">
        <div className="bg-card rounded-t-lg border border-border px-4 py-3 flex items-center justify-between">
          <h3 className="font-medium text-sm">
            Screenshot Result
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={() => handleCopy(result.imageUrl, 'Image URL')}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-all-200"
              title="Copy image URL"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-all-200"
              title="Download image"
            >
              <Download className="h-4 w-4" />
            </button>
            <a
              href={result.url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-all-200"
              title="Visit website"
            >
              <LinkIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
        
        <div className="relative border-x border-b border-border rounded-b-lg overflow-hidden" style={{minHeight: "200px"}}>
          {isImageLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
              <div className="animate-pulse flex flex-col items-center">
                <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
                <div className="h-3 w-24 bg-secondary/50 rounded"></div>
              </div>
            </div>
          )}
          
          {imageError ? (
            <div className="flex flex-col items-center justify-center p-8 text-center h-64">
              <svg className="h-12 w-12 text-muted-foreground mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-muted-foreground">Failed to load the screenshot image.</p>
            </div>
          ) : (
            <img
              src={result.imageUrl}
              alt={`Screenshot of ${result.url}`}
              className={cn(
                "w-full h-auto object-contain",
                isImageLoading ? "opacity-0" : "opacity-100 transition-opacity duration-300"
              )}
              onLoad={handleImageLoad}
              onError={handleImageError}
              style={{minHeight: "100px"}}
            />
          )}
          
          <div className="absolute bottom-2 right-2">
            <div className="px-2 py-1 bg-black/70 backdrop-blur-sm text-white text-xs rounded-md">
              {result.width} × {result.height}
            </div>
          </div>
        </div>
      </div>
      
      {copySuccess && (
        <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm shadow-elevated animate-fade-in">
          {copySuccess}
        </div>
      )}
    </div>
  );
};

// This component is used in the placeholder state
const Camera = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
    <circle cx="12" cy="13" r="3"/>
  </svg>
);

export default ResultDisplay;
