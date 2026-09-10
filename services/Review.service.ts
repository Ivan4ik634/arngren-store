import { supabase } from '@/lib/supabase/client';
import { ReviewCreateT, ReviewWithUserT } from '@/types/ReviewT';

export const reviewService = {
  async getAll(id: string): Promise<ReviewWithUserT[] | null> {
    const res = await supabase.from('reviews').select('*,user_id(*)').eq('product_id', id);

    return res.data;
  },
  async addReview(data: ReviewCreateT) {
    const res = await supabase.from('reviews').insert(data).select('*,user_id(*)').single();

    return res;
  },
};
