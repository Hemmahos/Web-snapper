
import React, { useState } from 'react';
import { Wallet, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const WalletConnect: React.FC = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      toast.error('MetaMask is not installed. Please install MetaMask to connect your wallet.');
      return;
    }

    setIsConnecting(true);

    try {
      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const address = accounts[0];
      setWalletAddress(address);

      // Check if user is logged in
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        // Save wallet connection to database
        const { error } = await supabase
          .from('wallet_connections')
          .insert({
            user_id: user.id,
            wallet_address: address,
            wallet_type: 'ethereum'
          });

        if (error) {
          console.error('Error saving wallet connection:', error);
          toast.error('Failed to save wallet connection');
        } else {
          toast.success('Wallet connected successfully!');
        }
      } else {
        // Just store the address in state if user is not logged in
        toast.success('Wallet connected!');
        toast.info('Sign in to save your wallet connection');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    toast.info('Wallet disconnected');
  };

  return (
    <div>
      {walletAddress ? (
        <button
          onClick={disconnectWallet}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
        >
          <Wallet className="h-4 w-4" />
          <span className="hidden md:inline">
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </span>
        </button>
      ) : (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          {isConnecting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Wallet className="h-4 w-4" />
          )}
          <span>Connect Wallet</span>
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
