import { PAGES } from '@/configs/PAGES';
import { supabase } from '@/lib/supabase/client';

export const signInWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}${PAGES.CALLBACK_GOOGLE}`,
    },
  });
};
