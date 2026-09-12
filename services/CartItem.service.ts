import { supabase } from '@/lib/supabase/client';
import { CartItemWithOrderT } from '@/types/CartItemT';
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
  async getItems(product_ids: string[]): Promise<CartItemWithOrderT[] | null> {
    const res = await supabase
      .from('cart_items')
      .select('*,product_id(*),order_id(*,user_id(*))')
      .in('product_id', product_ids);
    return res.data;
  },
};
