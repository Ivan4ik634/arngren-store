'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import { Separator } from '@/components/ui/separator';
import { PAGES } from '@/configs/PAGES';
import { ProductT } from '@/types/ProductT';
import { Calendar, Eye, Hash, Package, Star, Tag, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { FC } from 'react';

interface Props {
  product: ProductT;
  handleDeleteProduct: (id: string) => void;
}

const DrawerDetailsProduct: FC<Props> = (props) => {
  const { product, handleDeleteProduct } = props;

  return (
    <Drawer>
      <DrawerTrigger>
        <Eye />
      </DrawerTrigger>
      <DrawerContent className="w-[700px]">
        <div className="mx-auto w-full max-w-3xl px-4 pb-10 pt-4">
          <div className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
            <Hash className="h-3 w-3" />
            <span>{product.id}</span>
          </div>

          {/* Галерея изображений */}
          <div className="mb-6 grid grid-cols-4 gap-2">
            <div className="col-span-4 h-72 w-full overflow-hidden rounded-2xl bg-muted">
              <img
                src={product.images?.[0]}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            </div>
            {product.images?.slice(1, 5).map((img, i) => (
              <div key={i} className="h-20 w-full overflow-hidden rounded-lg bg-muted">
                <img
                  src={img}
                  alt={`${product.name}-${i}`}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Заголовок */}
          <div className="mb-4 flex items-start justify-between gap-4">
            <div>
              <Badge variant="secondary" className="mb-2">
                <Tag className="mr-1 h-3 w-3" />
                {product.category}
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight">{product.name}</h2>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-2xl font-bold">${product.price}</span>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{product.rating}</span>
                <span>· {product.reviews} reviews</span>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="mb-6">
            <h3 className="mb-2 text-sm font-semibold text-muted-foreground">Description</h3>
            <p className="text-sm leading-relaxed">{product.description}</p>
          </div>

          <div className="mb-6 flex items-center gap-2">
            <Package className="h-4 w-4 text-muted-foreground" />
            {product.application ? (
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                Available for use
              </Badge>
            ) : (
              <Badge variant="destructive">Not available</Badge>
            )}
          </div>

          <Separator className="my-4" />

          {/* Продавец */}
          <div className="mb-6 flex items-center justify-between rounded-xl border p-4">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={product.seller?.avatar} />
                <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{product.seller?.name}</p>
                <p className="text-xs text-muted-foreground">{product.seller?.email}</p>
              </div>
            </div>
            <Link href={PAGES.PROFILE_ID(product.seller?.id)}>
              <Button variant="outline" size="sm">
                Profile seller
              </Button>
            </Link>
          </div>

          <div className="mb-6 flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            <span>Added {new Date(product.created_at).toLocaleDateString()}</span>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={() => handleDeleteProduct(product.id)}
              variant="destructive"
              className="flex-1">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerDetailsProduct;
