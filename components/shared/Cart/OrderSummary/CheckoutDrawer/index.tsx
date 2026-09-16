'use client';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { AddressT } from '@/types/OrderT';
import { FC, useState } from 'react';

interface Props {
  onCheckout: (address: AddressT) => void;
}

const CheckoutDrawer: FC<Props> = ({ onCheckout }) => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState<AddressT>({
    address: '',
    city: '',
    postal_code: '',
    country: '',
  });

  const handleChange = (field: keyof AddressT) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = () => {
    onCheckout(address);
    setOpen(false);
  };

  return (
    <Drawer swipeDirection="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger className="w-full">
        <Button size="lg" className="w-full mt-5 text-xl py-7">
          Checkout
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-120 py-5 px-5">
        <DrawerTitle className="font-bold text-2xl">Shipping Address</DrawerTitle>
        <div className="mt-8 space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Address</label>
            <Input
              value={address.address ?? ''}
              onChange={handleChange('address')}
              placeholder="Street, house, apartment"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">City</label>
            <Input
              value={address.city ?? ''}
              onChange={handleChange('city')}
              placeholder="Your city"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Postal code</label>
            <Input
              value={address.postal_code ?? ''}
              onChange={handleChange('postal_code')}
              placeholder="ZIP code"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Country</label>
            <Input
              value={address.country ?? ''}
              onChange={handleChange('country')}
              placeholder="Your country"
            />
          </div>
        </div>
        <div className="mt-auto pt-8">
          <Button onClick={handleSubmit} size="lg" className="w-full ">
            Confirm order
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CheckoutDrawer;
