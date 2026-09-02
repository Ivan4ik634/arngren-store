'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useProfile } from '@/hooks/useProfile';
import { useProfileStore } from '@/store/useProfileStore';
import dayjs from 'dayjs';
import { FC } from 'react';
import DialogEditProfile from './DialogEditProfile';
import PersonalInformation from './PersonalInformation';

interface Props {}

const ProfilePage: FC<Props> = (props) => {
  useProfile();
  const { profileStore } = useProfileStore();

  return (
    <div>
      <h1 className="font-bold text-2xl">Profile</h1>
      <p className="opacity-50">Manage your personal information and account settings</p>
      <div className="mt-5 flex items-center">
        <Avatar className="h-[200px] w-[200px]">
          <AvatarFallback>{profileStore?.name?.[0]?.toUpperCase()}</AvatarFallback>
          <AvatarImage src={profileStore?.avatar} />
        </Avatar>

        <div className="ml-5 space-y-3 w-full">
          <div className="flex justify-between">
            <h1 className="font-bold text-3xl">{profileStore?.name}</h1>
            <DialogEditProfile profile={profileStore} />
          </div>
          <p className="opacity-50">{profileStore?.email}</p>
          <p>{dayjs(profileStore?.created_at).format('DD MMM YYYY')}</p>
        </div>
      </div>
      <PersonalInformation profile={profileStore} />
    </div>
  );
};

export default ProfilePage;
