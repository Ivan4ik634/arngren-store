export const typeConfig = {
  income: {
    value: 'income',
    label: 'Income',
    className: 'bg-green-100 text-green-700 hover:bg-green-100',
  },
  deposit: {
    value: 'deposit',
    label: 'Deposit',
    className: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100',
  },
  purchase: {
    value: 'purchase',
    label: 'Purchase',
    className: 'bg-red-100 text-red-700 hover:bg-red-100',
  },
  withdraw: {
    value: 'withdraw',
    label: 'Withdraw',
    className: 'bg-blue-100 text-blue-700 hover:bg-blue-100',
  },
};
type TransactionType = 'income' | 'deposit' | 'purchase' | 'withdraw';
