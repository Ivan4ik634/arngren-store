import { PAGES } from '@/configs/PAGES';
import { supabase } from '@/lib/supabase/client';

export const signInWithX = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'x',
    options: {
      redirectTo: `${window.location.origin}${PAGES.CALLBACK_X}`,
    },
  });
};
