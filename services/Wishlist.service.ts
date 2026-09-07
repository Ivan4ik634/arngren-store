import { supabase } from '@/lib/supabase/client';
import { FiltersProductT } from '@/types/FiltersT';

export const wishlistService = {
  async getWishlist(filters: FiltersProductT) {
    let query = supabase.from('wishlist').select('*, product_id(*)');
    if (filters.search) {
      query = query.ilike('product_id.name', `%${filters.search}%`);
    }
    if (filters.category && filters.category !== 'all') {
      query = query.eq('product_id.category', filters.category);
    }
    if (filters.availability === 'in-stock') {
      query = query.gt('product_id.count', 0);
    }
    if (filters.availability === 'out-of-stock') {
      query = query.eq('product_id.count', 0);
    }
    const res = await query;
    return res;
  },
  async addProduct(id: string) {
    const res = await supabase.from('wishlist').insert({ product_id: id }).select();
    return res;
  },
  async deleteProduct(id: string) {
    const res = await supabase.from('wishlist').delete().eq('product_id', id).select();
    return res;
  },
};
