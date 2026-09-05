'use client';

import { productService } from '@/services/Product.service';
import { FiltersProductT } from '@/types/FiltersT';
import { ProductT } from '@/types/ProductT';
import { FC, useEffect, useState } from 'react';
import ProductsFilters from './ProductsFilters';
import ProductsStats from './ProductsStats';
import ProductsTable from './ProductsTable';

interface Props {}

const ProductsPage: FC<Props> = (props) => {
  const [filters, setFilters] = useState<FiltersProductT>({
    search: '',
    category: 'all',
    availability: 'all',
  });
  const [products, setProducts] = useState<ProductT[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const res = await productService.getProducts(filters);
      setProducts(res.data as any as ProductT[]);
    };
    getProducts();
  }, [filters]);
  return (
    <div className="mt-8 w-full">
      <h1 className="font-bold text-2xl">Products</h1>
      <ProductsStats products={products} />
      <ProductsFilters filters={filters} setFilters={setFilters} />
      <ProductsTable products={products} />
    </div>
  );
};

export default ProductsPage;
