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
      <div className="mt-5 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
        <Avatar className="size-24 shrink-0 sm:size-32 lg:size-[200px]">
          <AvatarFallback>{profile?.name?.[0]?.toUpperCase()}</AvatarFallback>
          <AvatarImage src={profile?.avatar} />
        </Avatar>

        <div className="w-full min-w-0 space-y-3 sm:ml-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="break-words text-2xl font-bold sm:text-3xl">{profile?.name}</h1>
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
