import { supabase } from '@/lib/supabase';
import { userService } from '@/services/User.service';
import { useProfileStore } from '@/store/useProfileStore';
import { UserT } from '@/types/UserT';
import { useEffect, useState } from 'react';

export const useProfile = () => {
  const [profile, setProfile] = useState<UserT | null>(null);
  const { setProfileStore } = useProfileStore();
  useEffect(() => {
    const getProfile = async () => {
      const user = await supabase.auth.getUser();
      if (!user.data.user) return;
      const res = await userService.getUser(user.data.user.id);
      setProfile(res.data);
      setProfileStore(res.data);
    };
    getProfile();
  }, []);

  return { profile };
};
