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
    <div className="min-w-0 space-y-10 sm:space-y-12">
      <ProductInformation product={product} />
      <ProductReview product={product} />
    </div>
  );
};

export default ProductPage;
