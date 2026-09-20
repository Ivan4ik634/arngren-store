import NotFoundData from '@/components/shared/NotFoundData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PAGES } from '@/configs/PAGES';
import { ProductT } from '@/types/ProductT';
import { Package } from 'lucide-react';
import { FC } from 'react';
import { DashboardList } from '../AdminDashboardList';

interface Props {
  products: ProductT[] | undefined | null;
}
const AdminLatestProducts: FC<Props> = ({ products }) => {
  return (
    <DashboardList title="Latest Products" icon={Package} action={PAGES.ADMIN_PRODUCTS}>
      <Table className="text-xs">
        <TableHeader className="text-[10px] uppercase tracking-wide text-slate-400">
          <TableRow className="hover:bg-transparent">
            <TableHead className="px-2 py-2">Product</TableHead>
            <TableHead className="py-2">Category</TableHead>
            <TableHead className="py-2 ">Count</TableHead>
            <TableHead className="py-2 text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.length ? (
            products?.map((product) => (
              <TableRow key={product.id} className="hover:bg-slate-50">
                <TableCell className="px-2 py-2">
                  <div className="flex items-center gap-3">
                    <div className="relative size-8 overflow-hidden rounded-md bg-slate-100">
                      <img src={product.images[0]} className="object-cover" />
                    </div>
                    <span className="text-[11px] font-medium text-slate-600">
                      {product.name.slice(0, 20)}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-2 uppercase text-[10px] text-slate-400">
                  {product.category}
                </TableCell>
                <TableCell className="py-2 text-[10px] text-slate-600">{product.count}</TableCell>
                <TableCell className="py-2 text-right text-[10px] text-slate-600">
                  {product.price}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4}>
                <NotFoundData type="dashboard-products" />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </DashboardList>
  );
};

export default AdminLatestProducts;
