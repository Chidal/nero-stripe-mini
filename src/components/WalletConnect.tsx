import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Web3Auth } from '@web3auth/modal';
import { CHAIN_NAMESPACES } from '@web3auth/base';
import { toast } from 'react-toastify';
import { getSigner, getAAWalletAddress } from '../utils/aaUtils';
import { getReadableErrorMessage } from '../utils/errorHandler';

interface WalletConnectProps {
  onWalletConnected: (eoaAddress: string, aaAddress: string) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onWalletConnected }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);

  useEffect(() => {
    const initWeb3Auth = async () => {
      try {
        const web3authInstance = new Web3Auth({
          clientId: 'virtual_web3auth_client_id', // Virtual client ID
          chainConfig: {
            chainNamespace: CHAIN_NAMESPACES.EIP155,
            chainId: '0x2a9', // 689 in hex
            rpcTarget: 'https://rpc-testnet.nerochain.io',
            displayName: 'NERO Testnet',
            blockExplorer: 'https://testnet.neroscan.io',
            ticker: 'NERO',
            tickerName: 'NERO',
          },
          web3AuthNetwork: 'testnet',
        });
        await web3authInstance.initModal();
        setWeb3auth(web3authInstance);
      } catch (error) {
        console.error('Web3Auth initialization failed:', error);
        toast.error('Failed to initialize Web3Auth');
      }
    };
    initWeb3Auth();
  }, []);

  const connectWallet = async (socialLogin = false) => {
    setIsLoading(true);
    try {
      let signer: ethers.Signer;
      if (socialLogin && web3auth) {
        // Mock signer for testing with virtual details
        signer = new ethers.Wallet('0x0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef') as any;
      } else {
        signer = await getSigner();
      }
      const eoaAddress = await signer.getAddress();
      const aaAddress = await getAAWalletAddress(signer);
      setIsConnected(true);
      onWalletConnected(eoaAddress, aaAddress);
      toast.success('Wallet connected successfully!');
    } catch (error: any) {
      toast.error(getReadableErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => connectWallet(false)}
        disabled={isLoading}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-400 animate-slide-up"
      >
        {isLoading ? 'Connecting...' : isConnected ? 'Connected' : 'Connect MetaMask'}
      </button>
      <button
        onClick={() => connectWallet(true)}
        disabled={isLoading || !web3auth}
        className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-gray-400 animate-slide-up"
      >
        {isLoading ? 'Connecting...' : 'Connect with Google'}
      </button>
    </div>
  );
};

export default WalletConnect;