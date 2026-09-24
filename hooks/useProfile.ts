import { supabase } from '@/lib/supabase/client';
import { userService } from '@/services/User.service';
import { UserT } from '@/types/UserT';
import { useEffect, useState } from 'react';

// Глобальный кэш профиля и подписчики — все вызовы useProfile разделяют одно состояние
let cachedProfile: UserT | null = null;
let cachedUserId: string | null = null;
const listeners = new Set<() => void>();

const notify = () => listeners.forEach((listener) => listener());

const fetchProfile = async (userId: string) => {
  const res = await userService.getById(userId);
  cachedProfile = res.data ?? null;
  notify();
};

export const useProfile = () => {
  const [profile, setProfileState] = useState<UserT | null>(cachedProfile);

  useEffect(() => {
    const listener = () => setProfileState(cachedProfile);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        cachedProfile = null;
        cachedUserId = null;
        notify();
        return;
      }
      cachedUserId = user.id;
      await fetchProfile(user.id);
    };
    load();

    // Реагируем на смену пользователя (вход/выход)
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      const userId = session?.user?.id ?? null;
      if (userId !== cachedUserId) {
        cachedUserId = userId;
        if (userId) {
          fetchProfile(userId);
        } else {
          cachedProfile = null;
          notify();
        }
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const setProfile = (value: UserT | null) => {
    cachedProfile = value;
    notify();
  };

  return { profile, setProfile };
};
