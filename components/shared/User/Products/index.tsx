'use client';

import Loading from '@/components/shared/Loading';
import NotFoundData from '@/components/shared/NotFoundData';
import { Button } from '@/components/ui/button';
import { handleActionAddProduct, handleActionEditProduct } from '@/funcs/ActionFormProduct';
import { useDebounce } from '@/hooks/useDebounce';
import { useProfile } from '@/hooks/useProfile';
import { useSyncQueryData } from '@/hooks/useSyncQueryData';
import { productService } from '@/services/Product.service';
import { FiltersProductT } from '@/types/FiltersT';
import { ProductT } from '@/types/ProductT';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import ProductCard from '../../ProductCard';
import DialogFormProduct from './DialogFormProduct';
import UserProductsFilters from './UserProductsFilters';

type Props = Record<string, never>;

const UserProductsPage: FC<Props> = (props) => {
  const [filters, setFilters] = useState<FiltersProductT>({
    search: '',
    category: 'all',
    availability: 'all',
  });
  const debouncedFilters = useDebounce(filters, 300);
  const { profile } = useProfile();
  const { data, isPending } = useQuery({
    queryKey: ['products', debouncedFilters],
    queryFn: () => productService.getUserProducts(profile?.id || '', debouncedFilters),
    enabled: !!profile,
  });
  const [products, setProducts] = useSyncQueryData<ProductT>(data);

  const handleDelete = async (id: string) => {
    await productService.delete(id);
    setProducts((prev) => prev?.filter((product) => product.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-2xl">Products</h1>
          <p className="opacity-50"> Manage your products</p>
        </div>
        <DialogFormProduct action={handleActionAddProduct}>
          <Button variant="outline">Add product</Button>
        </DialogFormProduct>
      </div>
      <UserProductsFilters filters={filters} setFilters={setFilters} />
      {isPending ? (
        <Loading />
      ) : (
        <div className="mt-5 grid grid-cols-4 gap-5">
          {products?.length ? (
            products?.map((product) => (
              <ProductCard
                className=" gap-x-2 mt-5 justify-end flex w-full"
                profile={profile}
                key={product.id}
                product={product}>
                <DialogFormProduct
                  init={{ ...product }}
                  className="w-full"
                  action={(form, images) => handleActionEditProduct(form, images, product.id)}>
                  <Button className="w-full px-8 textl-xl py-5">Edit</Button>
                </DialogFormProduct>
                <Button
                  className=" px-8 textl-xl py-5"
                  onClick={() => handleDelete(product.id)}
                  variant="destructive">
                  Delete
                </Button>
              </ProductCard>
            ))
          ) : (
            <NotFoundData type="products" className="col-span-full" />
          )}
        </div>
      )}
    </div>
  );
};

export default UserProductsPage;
