'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import { PAGES } from '@/configs/PAGES';
import { LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthRequiredDialog: FC<Props> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[400px]">
        <DialogTitle>Sign in required</DialogTitle>
        <DialogDescription>
          You need to be signed in to add products to your cart. Please log in or create an account
          to continue.
        </DialogDescription>
        <div className="mt-4 flex flex-col gap-2">
          <Link href={PAGES.LOGIN}>
            <Button className="w-full">
              <LogIn className="size-4" />
              Log in
            </Button>
          </Link>
          <Link href={PAGES.REGISTER}>
            <Button variant="outline" className="w-full">
              <UserPlus className="size-4" />
              Create account
            </Button>
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthRequiredDialog;