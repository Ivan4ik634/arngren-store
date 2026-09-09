'use client';

import { FC } from 'react';

import { ProductT } from '@/types/ProductT';
import ProductInformation from './ProductInformation';
import ProductReview from './ProductReview';
interface Props {
  product: ProductT;
}

const ProductPage: FC<Props> = ({ product }) => {
  return (
    <div className=" h-[calc(100vh-200px)]  space-y-12.5">
      <ProductInformation product={product} />
      <ProductReview />
    </div>
  );
};

export default ProductPage;
