'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { statusConfig } from '@/configs/STATUS';
import { typeConfig } from '@/configs/TYPE';
import { TransactionT } from '@/types/TransactionT';
import dayjs from 'dayjs';
import { ReceiptText } from 'lucide-react';
import { FC } from 'react';

interface Props {
  transactions: TransactionT[] | undefined | null;
}

const BalanceTransactionHistory: FC<Props> = ({ transactions }) => {
  return (
    <Card className="mt-5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ReceiptText className="size-5" />
          Transaction history
        </CardTitle>
        <CardDescription>All your recent balance movements</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions?.map((transaction) => {
              const status = statusConfig[transaction.status];
              const type = typeConfig[transaction.type];

              const sumbol =
                transaction.type === 'income' || transaction.type === 'deposit' ? '+' : '-';
              return (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.transaction}</TableCell>
                  <TableCell>
                    <div>
                      <p>{dayjs(transaction.created_at).format('MMM DD YYYY')}</p>
                      <p className="opacity-50">
                        {dayjs(transaction.created_at).format('hh:mm A')}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={type.className + 'px-4 py-2 w-min rounded-full'}>
                      <p>{transaction.type}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className={status.className + 'px-4 py-2 w-min rounded-full'}>
                      <p>{status.label}</p>
                    </div>
                  </TableCell>
                  <TableCell
                    className={`font-bold text-right ${sumbol === '+' ? 'text-green-500' : 'text-red-500'}`}>
                    {sumbol}${transaction.amount}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BalanceTransactionHistory;
