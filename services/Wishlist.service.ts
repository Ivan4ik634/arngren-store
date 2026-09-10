import { supabase } from '@/lib/supabase/client';
import { FiltersProductT } from '@/types/FiltersT';
import { WishlistWithProductT } from '@/types/WishlistT';

export const wishlistService = {
  async getWishlists(userId: string, filters: FiltersProductT) {
    let query = supabase.from('wishlist').select('*, product_id(*)').eq('user_id', userId);
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
    return res.data?.filter((item) => item.product_id) as any as WishlistWithProductT[];
  },
  async getWishlist(user_id: string, id: string) {
    let query = supabase
      .from('wishlist')
      .select('id,product_id')
      .eq('product_id', id)
      .eq('user_id', user_id)
      .single();

    const res = await query;
    return { ...res, data: res.data as any as { id: string; product_id: string } };
  },
  async addWishlist(user_id: string, product_id: string) {
    const res = await supabase
      .from('wishlist')
      .insert({ product_id: product_id, user_id })
      .select();
    return res;
  },
  async deleteWishlist(user_id: string, product_id: string) {
    const res = await supabase
      .from('wishlist')
      .delete()
      .eq('product_id', product_id)
      .eq('user_id', user_id)
      .select();
    return res;
  },
};
