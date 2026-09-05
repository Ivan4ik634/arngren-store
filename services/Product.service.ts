import { supabase } from '@/lib/supabase';
import { FiltersProductT } from '@/types/FiltersT';
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
  async getProducts(filters: FiltersProductT) {
    let query = supabase
      .from('products')
      .select(
        `
      id,
      name,
      category,
      brand,
      price,
      image,
      count,
      seller(id, name, avatar, email),
      created_at
    `,
      )
      .eq('application', true);

    if (filters.search) {
      query = query.ilike('name', `%${filters.search}%`);
    }

    if (filters.category !== 'all') {
      query = query.eq('category', filters.category);
    }

    if (filters.availability === 'in-stock') {
      query = query.gt('count', 0);
    }

    if (filters.availability === 'out-of-stock') {
      query = query.eq('count', 0);
    }

    return await query;
  },
  async editProduct(data: ProductUpdateT) {
    const res = await supabase
      .from('products')
      .update({ ...data })
      .eq('id', data.id);
    return res;
  },
};
