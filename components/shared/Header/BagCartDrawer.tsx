'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useProductCart } from '@/store/useProductCart';
import { ShoppingBag } from 'lucide-react';
import { FC } from 'react';
import BagProductCard from './BagProductCard';

interface Props {}

const BagCartDrawer: FC<Props> = (props) => {
  const { productCards } = useProductCart();
  return (
    <Drawer>
      <DrawerTrigger className="relative text-black transition-colors hover:text-[#0969ff]">
        <ShoppingBag className="size-5" />
        <Badge>{productCards.length}</Badge>
      </DrawerTrigger>
      <DrawerContent className="w-120 pt-5 px-5">
        <DrawerTitle className="font-bold text-2xl">Bag</DrawerTitle>
        <ScrollArea className="h-[87%]">
          <div className="flex flex-col mt-10 gap-y-5">
            {productCards.map((product) => (
              <BagProductCard
                product={product.product}
                count={product.count}
                key={product.product.id}
              />
            ))}
          </div>
        </ScrollArea>
        <div className="mt-5 w-full">
          <p className="text-lg font-bold">
            Total: $ {productCards.reduce((acc, card) => acc + card.count * card.product.price, 0)}
          </p>
          <Button size="lg" className="mt-5 w-full">
            Order now
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BagCartDrawer;
