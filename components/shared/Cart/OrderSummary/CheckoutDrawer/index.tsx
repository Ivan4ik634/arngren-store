'use client';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { AddressT } from '@/types/OrderT';
import { FC, useState } from 'react';
import toast from 'react-hot-toast';

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
    if (!address.address || !address.city || !address.postal_code || !address.country)
      return toast.error('Please fill in all the fields');
    onCheckout(address);
    setOpen(false);
  };

  return (
    <Drawer swipeDirection="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger render={<Button size="lg" className="mt-5 w-full py-7 text-xl" />}>
        Checkout
      </DrawerTrigger>
      <DrawerContent className="w-[min(30rem,100vw)]">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-5 sm:px-5">
        <DrawerTitle className="text-xl font-bold sm:text-2xl">Shipping Address</DrawerTitle>
        <div className="mt-6 space-y-5 sm:mt-8">
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
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CheckoutDrawer;
