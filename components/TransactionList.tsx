// components/TransactionList.tsx

// 1. กำหนด Interface ให้ชัดเจน (No 'any')
interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: 'income' | 'expense';
  created_at: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

// 2. ใช้ Named Export
export function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="space-y-2">
      {transactions.map((tx) => (
        <div key={tx.id} className="p-3 border rounded-lg flex justify-between">
          <span>{tx.title}</span>
          <span className={tx.type === 'income' ? 'text-blue-500' : 'text-pink-500'}>
            {tx.amount.toLocaleString()} บาท
          </span>
        </div>
      ))}
    </div>
  );
}