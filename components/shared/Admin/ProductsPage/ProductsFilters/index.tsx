'use client';

import { Button } from '@/components/ui/button';
import SearchInput from '@/components/ui/SearchInput';
import SelectFilter from '@/components/ui/SelectFilter';
import { availabilityFilters } from '@/data/Availability';
import { categoryFilters } from '@/data/Catogeries';
import { productService } from '@/services/Product.service';
import { FiltersProductT } from '@/types/FiltersT';
import { ProductT } from '@/types/ProductT';
import { Download, Trash2 } from 'lucide-react';
import { Dispatch, FC, SetStateAction } from 'react';

interface Props {
  setFilters: Dispatch<SetStateAction<FiltersProductT>>;
  setProducts: Dispatch<SetStateAction<ProductT[] | undefined | null>>;
  filters: FiltersProductT;
  idsChecked: string[];
}
const ProductsFilters: FC<Props> = ({ setProducts, idsChecked, filters, setFilters }) => {
  const handleDelete = async () => {
    await productService.deleteProducts(idsChecked);
    setProducts((prev) => prev?.filter((product) => !idsChecked.includes(product.id)));
  };
  return (
    <div className="flex mt-5 justify-between">
      <div className="flex gap-x-5 items-center">
        <SearchInput
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <SelectFilter
          value={filters.availability}
          onChange={(value) => setFilters({ ...filters, availability: value! })}
          label="Availability"
          options={availabilityFilters}
        />
        <SelectFilter
          value={filters.category}
          onChange={(value) => setFilters({ ...filters, category: value! })}
          label="Category"
          options={categoryFilters}
        />
      </div>
      <div>
        {idsChecked.length > 0 && (
          <Button onClick={handleDelete} variant="destructive">
            <Trash2 className="mr-2 h-4 w-4" /> Delete {idsChecked.length} rows
          </Button>
        )}
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" /> Export
        </Button>
      </div>
    </div>
  );
};

export default ProductsFilters;
