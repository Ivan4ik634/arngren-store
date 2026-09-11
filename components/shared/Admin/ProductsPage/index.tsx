'use client';

import { useCheckboxes } from '@/hooks/useCheckboxes';
import { productService } from '@/services/Product.service';
import { FiltersProductT } from '@/types/FiltersT';
import { ProductT } from '@/types/ProductT';
import { useQuery } from '@tanstack/react-query';
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
  const { data } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.getProducts(filters),
  });
  const [products, setProducts] = useState<ProductT[] | undefined | null>(data || []);

  useEffect(() => {
    setProducts(data);
  }, [data]);

  const checkboxes = useCheckboxes(products || [], (product) => product.id);

  return (
    <div className="mt-8 w-full">
      <h1 className="font-bold text-2xl">Products</h1>
      <ProductsStats products={products} />
      <ProductsFilters
        setProducts={setProducts}
        idsChecked={checkboxes.idsChecked}
        filters={filters}
        setFilters={setFilters}
      />
      <ProductsTable setProducts={setProducts} {...checkboxes} products={products} />
    </div>
  );
};

export default ProductsPage;
