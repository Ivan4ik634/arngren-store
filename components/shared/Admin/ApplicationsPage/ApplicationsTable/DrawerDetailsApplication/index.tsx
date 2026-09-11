'use client';

import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Eye } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const DrawerDetailsApplication: FC<Props> = (props) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <Eye />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Details</DrawerTitle>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerDetailsApplication;
