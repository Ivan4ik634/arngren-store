'use client';

import AuthRequiredDialog from '@/components/shared/AuthRequiredDialog';
import NotFoundData from '@/components/shared/NotFoundData';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PAGES } from '@/configs/PAGES';
import { categoryFilters } from '@/data/Catogeries';
import { useProfile } from '@/hooks/useProfile';
import { useFilters } from '@/store/useFilters';
import { useProductBuyNow } from '@/store/useProductBuyNow';
import { useProductCart } from '@/store/useProductCart';
import { ProductT } from '@/types/ProductT';
import { FiltersMenuT } from '@/types/FiltersT';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import Loading from '../Loading';
import ProductCard from '../ProductCard';

interface Props {
  products: ProductT[] | undefined;
  isPending: boolean;
}

const MenuProducts: FC<Props> = ({ products, isPending }) => {
  const { filters, setFilters } = useFilters();
  const { addProductCard, incrementProductCount, productCards } = useProductCart();
  const { profile } = useProfile();
  const { setProduct } = useProductBuyNow();
  const router = useRouter();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);

  const handleAddToCart = (product: ProductT) => {
    if (!profile?.id) {
      setAuthDialogOpen(true);
      return;
    }
    const productInCart = productCards.find((card) => card.product?.id === product.id);
    productInCart ? incrementProductCount(product.id) : addProductCard({ product, count: 1 });
  };

  const handleBuyNow = (product: ProductT) => {
    if (!profile?.id) {
      setAuthDialogOpen(true);
      return;
    }
    setProduct({ product, count: 1 });
    router.push(PAGES.CART + '?buyNow=true');
  };

  return (
    <div className="flex min-w-0 w-full flex-col gap-5">
      <div className="mt-3 mb-2 flex w-full min-w-0 items-start justify-between">
        <div className="min-w-0">
          <h1 className="font-bold">{products?.length ?? 0} items found</h1>

          <div className="mt-3 flex flex-wrap gap-2">
            {categoryFilters.map((category) => (
              <Button
                onClick={() =>
                  setFilters({
                    ...filters,
                    categories: [category.value],
                  })
                }
                key={category.value}
                variant={filters.categories.includes(category.value) ? 'default' : 'outline'}
                className="h-9 px-3">
                {category.label}
              </Button>
            ))}

            <Select
              defaultValue="Price: Low to High"
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  sortBy: value as FiltersMenuT['sortBy'],
                })
              }>
              <SelectTrigger className="w-[170px] max-w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Price: Low to High">Price: Low to High</SelectItem>

                <SelectItem value="Price: High to Low">Price: High to Low</SelectItem>

                <SelectItem value="Rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {isPending ? (
        <Loading className="mt-30" />
      ) : (
        <div className="grid w-full min-w-0 grid-cols-1 gap-4 min-[600px]:grid-cols-2 xl:grid-cols-4">
          {products?.length ? (
            products?.map((product) => {
              const productInCart = productCards.find((card) => card.product?.id === product.id);

              return (
                <ProductCard
                  product={product}
                  profile={profile}
                  className="mt-4 grid grid-cols-[1fr_48px] gap-3"
                  key={product.id}>
                  <Button
                    onClick={() =>
                      productInCart ? incrementProductCount(product.id) : handleAddToCart(product)
                    }
                    className="h-9 rounded-md bg-[#0969ff] text-sm hover:bg-[#0057df]">
                    + Add to cart
                  </Button>
                  <Button
                    onClick={() => handleBuyNow(product)}
                    variant="outline"
                    size="icon-lg"
                    className="h-9 w-12 rounded-md border-zinc-200 bg-zinc-50">
                    <ShoppingCart className="size-4" />
                  </Button>
                </ProductCard>
              );
            })
          ) : (
            <NotFoundData type="menu" className="col-span-full" />
          )}
        </div>
      )}
      <AuthRequiredDialog open={authDialogOpen} onOpenChange={setAuthDialogOpen} />
    </div>
  );
};

export default MenuProducts;
