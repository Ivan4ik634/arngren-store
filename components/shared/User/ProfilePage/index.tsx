'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useProfile } from '@/hooks/useProfile';
import dayjs from 'dayjs';
import { FC } from 'react';
import DialogEditProfile from './DialogEditProfile';
import PersonalInformation from './PersonalInformation';

type Props = Record<string, never>;

const ProfilePage: FC<Props> = (props) => {
  const { profile } = useProfile();

  return (
    <div>
      <h1 className="font-bold text-2xl">Profile</h1>
      <p className="opacity-50">Manage your personal information and account settings</p>
      <div className="mt-5 flex items-center">
        <Avatar className="h-[200px] w-[200px]">
          <AvatarFallback>{profile?.name?.[0]?.toUpperCase()}</AvatarFallback>
          <AvatarImage src={profile?.avatar} />
        </Avatar>

        <div className="ml-5 space-y-3 w-full">
          <div className="flex justify-between">
            <h1 className="font-bold text-3xl">{profile?.name}</h1>
            <DialogEditProfile profile={profile} />
          </div>
          <p className="opacity-50">{profile?.email}</p>
          <p>{dayjs(profile?.created_at).format('DD MMM YYYY')}</p>
        </div>
      </div>
      <PersonalInformation profile={profile} />
    </div>
  );
};

export default ProfilePage;
