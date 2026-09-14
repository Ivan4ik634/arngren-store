'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import dayjs from 'dayjs';
import { Download, ReceiptText } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const BalanceTransactionHistory: FC<Props> = (props) => {
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
            <TableRow>
              <TableCell className="font-medium">Order #10234</TableCell>
              <TableCell>
                <div>
                  <p>{dayjs('2026-09-10').format('MMM DD YYYY')}</p>
                  <p className="opacity-50">{dayjs('2026-09-10').format('hh:mm A')}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="px-4 py-2 bg-green-500/20 w-min rounded-full">
                  <p className="text-green-500">Income</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="px-4 py-2 bg-green-500/20 w-min rounded-full">
                  <p className="text-green-500">Completed</p>
                </div>
              </TableCell>
              <TableCell className="font-bold text-right text-green-500">+$120.00</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Top up</TableCell>
              <TableCell>
                <div>
                  <p>{dayjs('2026-09-08').format('MMM DD YYYY')}</p>
                  <p className="opacity-50">{dayjs('2026-09-08').format('hh:mm A')}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="px-4 py-2 bg-blue-500/20 w-min rounded-full">
                  <p className="text-blue-500">Deposit</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="px-4 py-2 bg-green-500/20 w-min rounded-full">
                  <p className="text-green-500">Completed</p>
                </div>
              </TableCell>
              <TableCell className="font-bold text-right text-green-500">+$50.00</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Order #10198</TableCell>
              <TableCell>
                <div>
                  <p>{dayjs('2026-09-05').format('MMM DD YYYY')}</p>
                  <p className="opacity-50">{dayjs('2026-09-05').format('hh:mm A')}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="px-4 py-2 bg-red-500/20 w-min rounded-full">
                  <p className="text-red-500">Purchase</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="px-4 py-2 bg-green-500/20 w-min rounded-full">
                  <p className="text-green-500">Completed</p>
                </div>
              </TableCell>
              <TableCell className="font-bold text-right text-red-500">-$89.99</TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="font-medium">Withdrawal</TableCell>
              <TableCell>
                <div>
                  <p>{dayjs('2026-09-01').format('MMM DD YYYY')}</p>
                  <p className="opacity-50">{dayjs('2026-09-01').format('hh:mm A')}</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="px-4 py-2 bg-yellow-500/20 w-min rounded-full">
                  <p className="text-yellow-500">Withdraw</p>
                </div>
              </TableCell>
              <TableCell>
                <div className="px-4 py-2 bg-yellow-500/20 w-min rounded-full">
                  <p className="text-yellow-500">Pending</p>
                </div>
              </TableCell>
              <TableCell className="font-bold text-right text-red-500">-$200.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="mt-4 flex items-center justify-between">
          <p className="opacity-50 text-sm">Showing 4 of 24 transactions</p>
          <Button variant="outline" size="sm">
            <Download className="size-4" />
            Export
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BalanceTransactionHistory;
