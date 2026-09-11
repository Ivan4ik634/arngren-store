'use client';

import { Button } from '@/components/ui/button';
import { handleActionAddProduct, handleActionEditProduct } from '@/funcs/ActionFormProduct';
import { useProfile } from '@/hooks/useProfile';
import { productService } from '@/services/Product.service';
import { FiltersProductT } from '@/types/FiltersT';
import { ProductT } from '@/types/ProductT';
import { useQuery } from '@tanstack/react-query';
import { FC, useEffect, useState } from 'react';
import ProductCard from '../../ProductCard';
import DialogFormProduct from './DialogFormProduct';
import UserProductsFilters from './UserProductsFilters';

interface Props {}

const UserProductsPage: FC<Props> = (props) => {
  const [filters, setFilters] = useState<FiltersProductT>({
    search: '',
    category: 'all',
    availability: 'all',
  });
  const { profile } = useProfile();
  const { data } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getUserProducts(profile?.id || '', filters),
    enabled: !!profile,
  });
  const [products, setProducts] = useState<ProductT[] | undefined | null>(data);
  useEffect(() => {
    setProducts(data);
  }, [data]);

  const handleDelete = async (id: string) => {
    await productService.deleteProduct(id);
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
      <div className="mt-5 grid grid-cols-4 gap-5">
        {products?.map((product) => (
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
        ))}
      </div>
    </div>
  );
};

export default UserProductsPage;
