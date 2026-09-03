import { supabase } from '@/lib/supabase';
import { ProductCreateT, ProductUpdateT } from '@/types/ProductT';

export const productService = {
  async addProduct(data: ProductCreateT) {
    const res = await supabase
      .from('products')
      .insert({ ...data })
      .select()
      .single();
    return res;
  },

  async getUserProducts(id: string) {
    const res = await supabase.from('products').select('*').eq('seller', id);
    return res;
  },
  async getProducts() {
    const res = await supabase.from('products').select('*').eq('application', true);
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
