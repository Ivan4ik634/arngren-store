'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ProductT } from '@/types/ProductT';
import dayjs from 'dayjs';
import { EllipsisVerticalIcon } from 'lucide-react';
import { FC } from 'react';

interface Props {
  products: ProductT[];
}

const ProductsTable: FC<Props> = ({ products }) => {
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[150px] ">Product</TableHead>
          <TableHead>Seller</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Availability</TableHead>
          <TableHead>Count</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow>
            <TableCell className="w-[150px]">
              <p>{product.name}</p>
            </TableCell>
            <TableCell className="flex items-center font-medium">
              <Avatar size="lg">
                <AvatarImage src={product.seller.avatar} />
                <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="ml-3">{product.seller.name}</p>
              </div>
            </TableCell>
            <TableCell className="font-bold">${product.price}</TableCell>
            <TableCell>
              <div>
                <p>{dayjs(product.created_at).format('MMM DD YYYY')}</p>
                <p className="opacity-50">{dayjs(product.created_at).format('hh:mm A')}</p>
              </div>
            </TableCell>
            <TableCell>
              <div className="px-4 py-2 bg-green-500/20 w-min rounded-full ">
                <p className="text-green-500">{product.count > 0 ? 'Available' : 'Unavailable'}</p>
              </div>
            </TableCell>
            <TableCell className="">{product.count}</TableCell>
            <TableCell className="text-right">
              <EllipsisVerticalIcon />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
