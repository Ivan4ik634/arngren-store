import { supabase } from '@/lib/supabase/client';

export const signInWithGoogle = async () => {
  await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/callback/google`,
    },
  });
};
