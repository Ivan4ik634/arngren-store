import { supabase } from '@/lib/supabase';
import { ProductCreateT, ProductUpdateT } from '@/types/ProductT';

export const productService = {
  async addProduct(data: Omit<ProductCreateT, 'password'>) {
    const res = await supabase.from('products').insert({ ...data });
    return res;
  },
  async editProduct(data: ProductUpdateT) {
    const res = await supabase
      .from('products')
      .update({ ...data })
      .eq('id', data.id);
    return res;
  },
};
