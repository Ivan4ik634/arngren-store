'use client';

import { getProductsStats } from '@/data/AdminStats';
import { ProductT } from '@/types/ProductT';
import { FC } from 'react';
import CardStats from '../../ui/CardStats';

interface Props {
  products: ProductT[];
}
const ProductsStats: FC<Props> = (props) => {
  return <CardStats data={getProductsStats(props.products)} />;
};

export default ProductsStats;
