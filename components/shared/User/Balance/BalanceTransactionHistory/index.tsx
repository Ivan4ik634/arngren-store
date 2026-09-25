'use client';

import NotFoundData from '@/components/shared/NotFoundData';
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
        <div className="space-y-3 lg:hidden">
          {transactions?.length ? (
            transactions.map((transaction) => {
              const status = statusConfig[transaction.status];
              const type = typeConfig[transaction.type];
              const symbol =
                transaction.type === 'income' || transaction.type === 'deposit' ? '+' : '-';
              return (
                <article
                  key={transaction.id}
                  className="min-w-0 rounded-lg border border-zinc-200 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="break-all font-medium">{transaction.transaction}</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {dayjs(transaction.created_at).format('MMM DD YYYY, hh:mm A')}
                      </p>
                    </div>
                    <p
                      className={`shrink-0 font-bold ${symbol === '+' ? 'text-green-500' : 'text-red-500'}`}>
                      {symbol}${transaction.amount}
                    </p>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs">
                    <span className={`${type.className} rounded-full px-3 py-1`}>{type.label}</span>
                    <span className={`${status.className} rounded-full px-3 py-1`}>
                      {status.label}
                    </span>
                  </div>
                </article>
              );
            })
          ) : (
            <NotFoundData type="balance" />
          )}
        </div>
        <div className="hidden lg:block">
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
              {transactions?.length ? (
                transactions?.map((transaction) => {
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
                        <div className={type.className + ' px-5 py-2 w-min rounded-full'}>
                          {type.label}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={status.className + ' px-5 py-2 w-min rounded-full'}>
                          {status.label}
                        </div>
                      </TableCell>
                      <TableCell
                        className={`font-bold text-right ${sumbol === '+' ? 'text-green-500' : 'text-red-500'}`}>
                        {sumbol}${transaction.amount}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>
                    <NotFoundData type="balance" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceTransactionHistory;
