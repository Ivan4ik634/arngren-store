'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { statusConfig } from '@/configs/STATUS';
import { WithdrawalWithUserT } from '@/types/WithdrawalT';
import {
  Calendar,
  CheckCircle2,
  CreditCard,
  DollarSign,
  Eye,
  Hash,
  Mail,
  User,
  XCircle,
} from 'lucide-react';
import { FC, useState } from 'react';

interface Props {
  withdrawal: WithdrawalWithUserT;
  handleComplete: (withdrawal: WithdrawalWithUserT) => void;
  handleFail: (withdrawal: WithdrawalWithUserT) => void;
}

const DrawerDetailsWithdrawal: FC<Props> = (props) => {
  const { withdrawal, handleComplete, handleFail } = props;
  const [open, setOpen] = useState(false);
  const status = statusConfig[withdrawal?.status || 'pending'];
  const StatusIcon = status.icon;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="transition-colors hover:text-primary">
        <Eye className="h-5 w-5" />
      </DrawerTrigger>
      <DrawerContent className="w-[700px]">
        <div
          className="mx-auto flex w-full max-w-3xl flex-col px-4 pb-4 pt-4"
          style={{ minHeight: '100vh' }}>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Hash className="h-3 w-3" />
              <span>{withdrawal.id}</span>
            </div>
            <Badge className={status.className}>
              <StatusIcon className="mr-1 h-3 w-3" />
              {status.label}
            </Badge>
          </div>

          {/* Amount preview */}
          <div className="mb-6 flex gap-4">
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-muted">
              <DollarSign className="h-12 w-12 mx-auto my-auto text-primary" />
            </div>
            <div className="flex flex-col justify-center">
              <Badge variant="secondary" className="mb-1 w-fit">
                <CreditCard className="mr-1 h-3 w-3" />
                Withdrawal
              </Badge>
              <h2 className="text-lg font-bold tracking-tight">${withdrawal.amount}</h2>
              <p className="text-sm text-muted-foreground">Requested payout</p>
            </div>
          </div>

          {/* IBAN */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground">IBAN</h3>
            <div className="flex items-center justify-between rounded-xl border p-4">
              <div className="flex items-center gap-3">
                <CreditCard className="h-5 w-5 text-primary" />
                <p className="text-sm font-medium">{withdrawal.iban}</p>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* User info */}
          <div className="mb-6">
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground">User</h3>
            <div className="flex items-center justify-between rounded-xl border p-4">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={withdrawal.user_id.avatar} />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{withdrawal.user_id.name}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Mail className="h-3 w-3" />
                    <span>{withdrawal.user_id.email}</span>
                  </div>
                </div>
              </div>
              <Badge variant="outline">{withdrawal.user_id.role}</Badge>
            </div>
          </div>

          {/* Meta */}
          <div className="mb-6 flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Requested on {new Date(withdrawal.created_at).toLocaleDateString()}</span>
          </div>

          <Separator className="my-4" />

          {/* Admin actions */}
          <div className="mt-auto flex gap-3 pt-6">
            <Button
              onClick={() => {
                handleComplete(withdrawal);
                setOpen(false);
              }}
              variant="default"
              className="flex-1 bg-green-600 hover:bg-green-700">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Complete
            </Button>
            <Button
              onClick={() => {
                handleFail(withdrawal);
                setOpen(false);
              }}
              variant="destructive"
              className="flex-1">
              <XCircle className="mr-2 h-4 w-4" />
              Fail
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerDetailsWithdrawal;
