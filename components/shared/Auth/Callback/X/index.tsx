'use client';

import { PAGES } from '@/configs/PAGES';

import { supabase } from '@/lib/supabase/client';

import { useRouter } from 'next/navigation';

import { useEffect, useRef } from 'react';

export default function XCallbackPage() {
  const router = useRouter();

  const handled = useRef(false);

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);

      if (params.get('error')) {
        console.error('OAuth error:', params.get('error_description'));

        router.replace(PAGES.HOME);
        return;
      }

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      // Нет сессии: зашёл руками или обмен не удался
      if (error || !session?.user) {
        if (error) console.error('Session error:', error);

        router.replace(PAGES.HOME);
        return;
      }

      const user = session.user;

      const { error: profileError } = await supabase.from('profiles').upsert(
        {
          id: user.id,
          email: user.email,
          name: user.user_metadata?.name ?? user.user_metadata?.username ?? null,
          avatar: user.user_metadata?.avatar_url ?? user.user_metadata?.profile_image_url ?? null,
        },
        {
          onConflict: 'id',
          ignoreDuplicates: true,
        },
      );

      if (profileError) {
        console.error('Profile create error:', profileError);
      }

      router.replace(PAGES.HOME);
    };

    handleCallback();
  }, [router]);

  return null;
}
