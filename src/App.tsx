import React, { useState } from 'react';
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import WalletConnect from './components/WalletConnect';
import PaymentForm from './components/PaymentForm';
import PaymentTypeSelector from './components/PaymentTypeSelector';
import TransactionHistory from './components/TransactionHistory';

interface Transaction {
  id: string;
  recipient: string;
  amount: string;
  token: string;
  status: string;
  timestamp: string;
}

const App: React.FC = () => {
  const [signer, setSigner] = useState<ethers.Signer | undefined>(undefined);
  const [aaAddress, setAaAddress] = useState<string>('');
  const [paymentType, setPaymentType] = useState<number>(0);
  const [selectedToken, setSelectedToken] = useState<string>('');
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      recipient: 'user@example.com',
      amount: '10',
      token: 'USDC',
      status: 'Completed',
      timestamp: new Date().toISOString(),
    },
  ]);

  const handleWalletConnected = async (eoaAddress: string, aaAddress: string) => {
    try {
      const provider = new ethers.JsonRpcProvider('https://rpc-testnet.nerochain.io');
      const signer = await provider.getSigner(eoaAddress);
      setSigner(signer);
      setAaAddress(aaAddress);
      toast.success(`Connected: EOA ${eoaAddress}, AA ${aaAddress}`);
    } catch (error: any) {
      toast.error('Failed to set signer: ' + error.message);
    }
  };

  const handlePaymentTypeChange = (type: number, tokenAddress: string) => {
    setPaymentType(type);
    setSelectedToken(tokenAddress);
    toast.info(`Selected payment type: ${type}, Token: ${tokenAddress}`);
  };

  const handlePayment = (recipient: string, amount: string, token: string) => {
    setTransactions((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        recipient,
        amount,
        token,
        status: 'Pending',
        timestamp: new Date().toISOString(),
      },
    ]);
    toast.success(`Payment of ${amount} ${token} to ${recipient} initiated`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-primary">NERO Stripe Mini</h1>
      <WalletConnect onWalletConnected={handleWalletConnected} />
      {signer && (
        <>
          <PaymentTypeSelector signer={signer} onPaymentTypeChange={handlePaymentTypeChange} />
          <PaymentForm signer={signer} aaAddress={aaAddress} selectedToken={selectedToken} onPayment={handlePayment} />
          <TransactionHistory transactions={transactions} />
        </>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default App;