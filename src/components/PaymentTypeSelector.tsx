import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';
import { getSupportedTokens } from '../utils/aaUtils';

interface PaymentTypeSelectorProps {
  signer: ethers.Signer;
  onPaymentTypeChange: (type: number, tokenAddress: string) => void;
}

const PaymentTypeSelector: React.FC<PaymentTypeSelectorProps> = ({ signer, onPaymentTypeChange }) => {
  const [tokens, setTokens] = useState<any[]>([]);
  const [selectedToken, setSelectedToken] = useState<string>('');

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const tokenList = await getSupportedTokens(null, null);
        setTokens(tokenList);
        if (tokenList.length > 0) {
          setSelectedToken(tokenList[0].address);
          onPaymentTypeChange(
            tokenList[0].freepay ? 0 : tokenList[0].prepay ? 1 : 2,
            tokenList[0].address
          );
        }
      } catch (error) {
        toast.error('Failed to load supported tokens');
      }
    };
    fetchTokens();
  }, [onPaymentTypeChange]);

  const handleTokenChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tokenAddress = e.target.value;
    const token = tokens.find((t) => t.address === tokenAddress);
    setSelectedToken(tokenAddress);
    onPaymentTypeChange(token.freepay ? 0 : token.prepay ? 1 : 2, tokenAddress);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mt-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">Select Payment Type</h2>
      <select
        value={selectedToken}
        onChange={handleTokenChange}
        className="p-2 w-full border rounded-lg"
      >
        {tokens.map((token) => (
          <option key={token.address} value={token.address}>
            {token.symbol} ({token.freepay ? 'Free' : token.prepay ? 'Prepay' : 'Postpay'})
          </option>
        ))}
      </select>
    </div>
  );
};

export default PaymentTypeSelector;