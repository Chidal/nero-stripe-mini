export const getReadableErrorMessage = (error: any): string => {
  const errorMessage = error.message || error.toString();
  if (errorMessage.includes('insufficient funds')) return 'Insufficient funds to execute this transaction';
  if (errorMessage.includes('execution reverted')) return 'Transaction reverted - check the target contract';
  return errorMessage;
};