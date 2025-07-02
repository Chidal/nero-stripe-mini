import React, { useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

interface PaymentFormProps {
  signer: ethers.Signer;
  aaAddress: string;
  selectedToken: string;
  onPayment: (recipient: string, amount: string, token: string) => void;
}

const PAYMENT_ABI = [
  'function sendPayment(address recipient, uint256 amount, address token) returns (bool)',
];

const PaymentForm: React.FC<PaymentFormProps> = ({ signer, aaAddress, selectedToken, onPayment }) => {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateRecipient = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+\d{10,15}$/;
    return emailRegex.test(value) || phoneRegex.test(value);
  };

  const handlePayment = async () => {
    if (!signer || !recipient || !amount || !selectedToken) {
      toast.error('Please fill in all fields and select a token');
      return;
    }
    if (!validateRecipient(recipient)) {
      toast.error('Invalid recipient (must be email or phone number)');
      return;
    }
    setIsLoading(true);
    try {
      // Mock payment for virtual details
      onPayment(recipient, amount, selectedToken);
    } catch (error: any) {
      toast.error('Payment failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mt-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">Send Payment</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Recipient (Email or Phone)</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="mt-1 p-2 w-full border rounded-lg"
          placeholder="user@example.com or +1234567890"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Amount</label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-1 p-2 w-full border rounded-lg"
          placeholder="Enter amount"
        />
      </div>
      <button
        onClick={handlePayment}
        disabled={isLoading}
        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-opacity-90 disabled:bg-gray-400"
      >
        {isLoading ? 'Processing...' : 'Send Payment'}
      </button>
    </div>
  );
};

export default PaymentForm;