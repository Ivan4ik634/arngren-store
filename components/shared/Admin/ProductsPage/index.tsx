'use client';

import { FC } from 'react';
import ProductsFilters from './ProductsFilters';
import ProductsTable from './ProductsTable';

interface Props {}

const ProductsPage: FC<Props> = (props) => {
  return (
    <div className="mt-8 w-full">
      <h1 className="font-bold text-2xl">Products</h1>
      <ProductsFilters />
      <ProductsTable />
    </div>
  );
};

export default ProductsPage;
