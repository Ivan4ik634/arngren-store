import { supabase } from '@/lib/supabase/client';
import { ProductT } from '@/types/ProductT';

export const cartItemService = {
  async createItems(items: { product: ProductT; count: number }[], order_id: string) {
    const res = await supabase
      .from('cart_items')
      .insert(
        items.map((item: { product: ProductT; count: number }) => ({
          product_id: item.product.id,
          count: item.count,
          price: item.product.price * item.count,
          order_id: order_id,
        })),
      )
      .select();

    return res;
  },
};
