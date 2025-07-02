import { ethers } from 'ethers';
import { SimpleAccountAPI } from '@account-abstraction/sdk';
import { NERO_CHAIN_CONFIG, AA_PLATFORM_CONFIG, CONTRACT_ADDRESSES, API_KEY } from '../constants/config';

interface EthereumProvider {
  request: (args: { method: string; params?: any[] }) => Promise<any>;
}
declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export const getSigner = async (): Promise<ethers.Signer> => {
  if (!window.ethereum) throw new Error('No crypto wallet found. Please install MetaMask.');
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.BrowserProvider(window.ethereum);
  return provider.getSigner();
};

export const getAAWalletAddress = async (accountSigner: ethers.Signer): Promise<string> => {
  try {
    const provider = new ethers.JsonRpcProvider(NERO_CHAIN_CONFIG.rpcUrl);
    const walletAPI = new SimpleAccountAPI({
      provider: provider as any, // Cast to bypass type mismatch
      entryPointAddress: CONTRACT_ADDRESSES.entryPoint,
      owner: accountSigner as any, // Cast to bypass type mismatch
      factoryAddress: CONTRACT_ADDRESSES.accountFactory,
    });
    return await walletAPI.getAccountAddress();
  } catch (error) {
    console.error('Error getting AA wallet address:', error);
    throw error;
  }
};

export const getSupportedTokens = async (client: any, builder: any): Promise<any[]> => {
  return [
    { address: '0xVirtualStablecoin1', symbol: 'USDC', freepay: true, decimal: '6' },
    { address: '0xVirtualStablecoin2', symbol: 'DAI', prepay: true, decimal: '18' },
    { address: '0xVirtualStablecoin3', symbol: 'USDT', postpay: true, decimal: '6' },
  ];
};