'use client';

import { toast } from '@/components/ui/toast';
import { supabase } from '@/lib/supabase';
import { productService } from '@/services/Product.service';
import { ProductT } from '@/types/ProductT';
import { FC, useEffect, useState } from 'react';
import ProductCard from '../../ProductCard';
import DialogAddProduct from './DialogAddProduct';
import UserProductsFilters from './UserProductsFilters';

interface Props {}

const UserProductsPage: FC<Props> = (props) => {
  const [products, setProducts] = useState<ProductT[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!user) return toast.close(error?.message);

      const res = await productService.getUserProducts(user.id);

      setProducts(res.data as ProductT[]);
    };

    getProducts();
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-2xl">Products</h1>
          <p className="opacity-50"> Manage your products</p>
        </div>
        <DialogAddProduct />
      </div>
      <UserProductsFilters />
      <div className="mt-5 grid grid-cols-4 gap-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default UserProductsPage;
