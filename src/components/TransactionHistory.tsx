import React from 'react';
import { motion, MotionProps } from 'framer-motion';

interface Transaction {
  id: string;
  recipient: string;
  amount: string;
  token: string;
  status: string;
  timestamp: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  // Combine MotionProps with HTML div attributes
  type MotionDivProps = MotionProps & React.HTMLAttributes<HTMLDivElement>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mt-6"
      {...({} as MotionDivProps)} // Explicitly cast to combined type
    >
      <h2 className="text-2xl font-bold mb-4 text-primary">Transaction History</h2>
      <div className="space-y-4">
        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions found.</p>
        ) : (
          transactions.map((tx) => (
            <div key={tx.id} className="border-b pb-2">
              <p>
                <strong>Recipient:</strong> {tx.recipient}
              </p>
              <p>
                <strong>Amount:</strong> {tx.amount} {tx.token}
              </p>
              <p>
                <strong>Status:</strong> {tx.status}
              </p>
              <p>
                <strong>Date:</strong> {new Date(tx.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default TransactionHistory;