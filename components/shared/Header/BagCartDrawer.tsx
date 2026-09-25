'use client';

import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { PAGES } from '@/configs/PAGES';
import { useProfile } from '@/hooks/useProfile';
import { useProductCart } from '@/store/useProductCart';
import { Minus, Plus, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { FC, useState } from 'react';
import NotFoundData from '../NotFoundData';
import ProductCard from '../ProductCard';

const BagCartDrawer: FC = () => {
  const [open, setOpen] = useState(false);
  const { productCards } = useProductCart();
  const { profile } = useProfile();
  const { deleteProductCard, incrementProductCount, decrementProductCount } = useProductCart();
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger
        onClick={() => setOpen(true)}
        className="relative flex size-10 items-center justify-center text-black transition-colors hover:text-[#0969ff]">
        <ShoppingBag className="size-5" />
      </DrawerTrigger>
      <DrawerContent className="w-[min(30rem,100vw)] px-4 py-5 sm:px-5">
        <DrawerTitle className="font-bold text-2xl">Bag</DrawerTitle>

        <ScrollArea className="min-h-0 flex-1">
          <div className="flex flex-col mt-10 gap-y-5">
            {productCards.length > 0 ? (
              productCards.map(({ product, count }) => (
                <ProductCard
                  profile={profile}
                  className="mt-8 pt-5 border-t"
                  product={product}
                  key={product.id}>
                  <div className=" flex items-center justify-between">
                    <p className="text-lg font-extrabold text-black">Total</p>
                    <p className="text-lg font-extrabold text-black">${product.price * count}</p>
                  </div>
                  <div className="mt-5 flex w-full  items-center justify-between">
                    <div className="border-2   justify-center rounded-[5px] p-3 flex items-center">
                      <Minus onClick={() => decrementProductCount(product.id)} className="size-7" />
                      <span className="mx-5 text-xl">{count}</span>
                      <Plus onClick={() => incrementProductCount(product.id)} className="size-7" />
                    </div>
                    <Button
                      onClick={() => deleteProductCard(product.id)}
                      className="h-12 px-5  rounded-md bg-[#0969ff] text-sm hover:bg-[#0057df]">
                      Delete Product
                    </Button>
                  </div>
                </ProductCard>
              ))
            ) : (
              <NotFoundData type="cart" />
            )}
          </div>
        </ScrollArea>

        <div className="mt-5 w-full">
          <p className="text-lg font-bold">
            Total: $ {productCards.reduce((acc, card) => acc + card.count * card.product.price, 0)}
          </p>
          <Link href={PAGES.CART} onClick={() => setOpen(false)}>
            <Button size="lg" className="mt-5 w-full">
              Order now
            </Button>
          </Link>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default BagCartDrawer;
