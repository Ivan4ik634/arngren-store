'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { withdravalService } from '@/services/Withdrawal.service';
import { WithdrawalWithUserT } from '@/types/WithdrawalT';
import dayjs from 'dayjs';
import { Check, X } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';
import DrawerDetailsWithdrawal from './DrawerDetailsWithdrawal';

interface Props {
  withdrawals: WithdrawalWithUserT[] | undefined;
  setWithdrawals: Dispatch<SetStateAction<WithdrawalWithUserT[] | undefined>>;
  idsChecked: string[];
  allChecked: boolean;
  handleCheckAll: () => void;
  handleCheck: (id: string) => void;
}

const WithdrawalTable: FC<Props> = ({
  withdrawals,
  setWithdrawals,
  idsChecked,
  allChecked,
  handleCheckAll,
  handleCheck,
}) => {
  const handleComplete = async (withdrawal: WithdrawalWithUserT) => {
    await withdravalService.updateStatus(withdrawal.id, 'completed');
    setWithdrawals((prev) =>
      prev?.map((w) => (w.id === withdrawal.id ? { ...w, status: 'completed' } : w)),
    );
  };
  const handleFail = async (withdrawal: WithdrawalWithUserT) => {
    await withdravalService.updateStatus(withdrawal.id, 'failed');
    setWithdrawals((prev) =>
      prev?.map((w) => (w.id === withdrawal.id ? { ...w, status: 'failed' } : w)),
    );
  };
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px] ">
            <Checkbox checked={allChecked} onCheckedChange={handleCheckAll} />
          </TableHead>
          <TableHead>User</TableHead>
          <TableHead>IBAN</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Requested Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {withdrawals?.map((withdrawal) => (
          <TableRow key={withdrawal.id}>
            <TableHead className="w-[50px] ">
              <Checkbox
                checked={idsChecked.includes(withdrawal.id)}
                onCheckedChange={() => handleCheck(withdrawal.id)}
              />
            </TableHead>
            <TableCell>
              <div className="flex items-center">
                <Avatar size="lg">
                  <AvatarFallback>{withdrawal.user_id.name[0]}</AvatarFallback>
                  <AvatarImage src={withdrawal.user_id.avatar} />
                </Avatar>
                <div className="ml-5">
                  <h1>
                    <span className="font-bold">{withdrawal.user_id.name}</span>
                  </h1>
                  <p className="opacity-50">{withdrawal.user_id.email}</p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <p className="font-medium">{withdrawal.iban}</p>
            </TableCell>
            <TableCell>
              <p className="font-bold text-primary">${withdrawal.amount}</p>
            </TableCell>
            <TableCell>
              <div>
                <p>{dayjs(withdrawal.created_at).format('MMM DD YYYY')}</p>
                <p className="opacity-50">{dayjs(withdrawal.created_at).format('hh:mm A')}</p>
              </div>
            </TableCell>
            <TableCell>
              <div
                className={`px-4 py-2  w-min rounded-full ${withdrawal.status === 'completed' ? 'bg-green-500/20' : withdrawal.status === 'failed' ? 'bg-red-500/20' : 'bg-yellow-500/20'}`}>
                <p
                  className={
                    withdrawal.status === 'completed'
                      ? 'text-green-500'
                      : withdrawal.status === 'failed'
                        ? 'text-red-500'
                        : 'text-yellow-500'
                  }>
                  {withdrawal.status}
                </p>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex items-start justify-start  space-x-5">
                <Check onClick={() => handleComplete(withdrawal)} className="text-green-500" />
                <X onClick={() => handleFail(withdrawal)} className="text-red-500" />
                <DrawerDetailsWithdrawal
                  handleComplete={handleComplete}
                  handleFail={handleFail}
                  withdrawal={withdrawal}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default WithdrawalTable;
