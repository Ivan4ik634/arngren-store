'use client';

import Loading from '@/components/shared/Loading';
import { useCheckboxes } from '@/hooks/useCheckboxes';
import { useSyncQueryData } from '@/hooks/useSyncQueryData';
import { productService } from '@/services/Product.service';
import { FiltersProductT } from '@/types/FiltersT';
import { ProductT } from '@/types/ProductT';
import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import ProductsFilters from './ProductsFilters';
import ProductsStats from './ProductsStats';
import ProductsTable from './ProductsTable';

type Props = Record<string, never>;

const ProductsPage: FC<Props> = (props) => {
  const [filters, setFilters] = useState<FiltersProductT>({
    search: '',
    category: 'all',
    availability: 'all',
  });
  const { data, isPending } = useQuery({
    queryKey: ['products', filters],
    queryFn: () => productService.get(filters),
  });
  const [products, setProducts] = useSyncQueryData<ProductT>(data);

  const checkboxes = useCheckboxes(products || [], (product) => product.id);

  return (
    <div className="mt-8 w-full">
      <h1 className="font-bold text-2xl">Products</h1>
      <ProductsStats products={products} />
      <ProductsFilters
        {...checkboxes}
        setProducts={setProducts}
        filters={filters}
        setFilters={setFilters}
      />
      {isPending ? (
        <Loading />
      ) : (
        <ProductsTable setProducts={setProducts} {...checkboxes} products={products} />
      )}
    </div>
  );
};

export default ProductsPage;
