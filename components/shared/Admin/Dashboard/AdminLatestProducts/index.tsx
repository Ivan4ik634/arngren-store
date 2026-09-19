import { ProductT } from '@/types/ProductT';
import { Package } from 'lucide-react';
import { FC } from 'react';
import { DashboardList } from '../AdminDashboardList';

interface Props {
  products: ProductT[] | undefined | null;
}
const AdminLatestProducts: FC<Props> = ({ products }) => {
  return (
    <DashboardList title="Latest Products" icon={Package} action="/admin/products">
      <div className="space-y-1">
        {products?.map((product, index) => (
          <div
            key={product.id}
            className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-slate-50">
            <div className="relative size-8 overflow-hidden rounded-md bg-slate-100">
              <img src={product.images[0]} className="object-cover" />
            </div>
            <span className="flex-1 text-[11px] font-medium text-slate-600">{product.name}</span>
            <span className="hidden text-[10px] text-slate-400 sm:block">{product.category}</span>
            <span className="w-12 text-right text-[10px] text-slate-600">{product.count}</span>
            <span className="w-12 text-right text-[10px] text-slate-600">{product.price}</span>
          </div>
        ))}
      </div>
    </DashboardList>
  );
};

export default AdminLatestProducts;
