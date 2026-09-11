'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { productService } from '@/services/Product.service';
import { ProductT } from '@/types/ProductT';
import dayjs from 'dayjs';
import { Trash2 } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';
import DrawerDetailsProduct from './DrawerDetailsProduct';

interface Props {
  products: ProductT[] | undefined | null;
  idsChecked: string[];
  allChecked: boolean;
  setProducts: Dispatch<SetStateAction<ProductT[] | undefined | null>>;
  handleCheckAll: () => void;
  handleCheck: (id: string) => void;
}

const ProductsTable: FC<Props> = ({
  idsChecked,
  allChecked,
  handleCheckAll,
  handleCheck,
  products,
  setProducts,
}) => {
  const handleDelete = async (id: string) => {
    await productService.deleteProduct(id);
    setProducts((prev) => prev?.filter((product) => product.id !== id));
  };
  return (
    <Table className="mt-5">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[75px] ">
            <Checkbox checked={allChecked} onCheckedChange={handleCheckAll} />
          </TableHead>
          <TableHead>Product</TableHead>
          <TableHead>Seller</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Availability</TableHead>
          <TableHead>Count</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products?.map((product) => (
          <TableRow>
            <TableCell className="w-[75px] ">
              <Checkbox
                checked={idsChecked.includes(product.id)}
                onCheckedChange={() => handleCheck(product.id)}
              />
            </TableCell>
            <TableCell>
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
            <TableCell>
              <div className="flex items-start justify-start ">
                <Trash2 onClick={() => handleDelete(product.id)} className="mr-5 text-red-500" />
                <DrawerDetailsProduct handleDeleteProduct={handleDelete} product={product} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ProductsTable;
