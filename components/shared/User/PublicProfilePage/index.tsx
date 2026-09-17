'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserT } from '@/types/UserT';
import dayjs from 'dayjs';
import { CalendarDays, Mail, User } from 'lucide-react';
import { FC } from 'react';

interface Props {
  profile: Pick<UserT, 'id' | 'avatar' | 'name' | 'email' | 'created_at'>;
}

const PublicProfilePage: FC<Props> = ({ profile }) => {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-bold text-2xl">Profile</h1>
      <p className="opacity-50">Public profile</p>

      <div className="mt-8 flex flex-col items-center gap-y-6 rounded-2xl border p-8">
        <Avatar className="h-40 w-40">
          <AvatarFallback>{profile?.name?.[0]?.toUpperCase()}</AvatarFallback>
          <AvatarImage src={profile?.avatar} />
        </Avatar>

        <div className="flex items-center gap-x-2">
          <User className="size-5 opacity-50" />
          <h1 className="text-3xl font-bold">{profile?.name}</h1>
        </div>

        <div className="w-full space-y-4">
          <div className="flex items-center gap-x-3 rounded-lg bg-muted px-4 py-3">
            <Mail className="size-5 opacity-50" />
            <span>{profile?.email}</span>
          </div>
          <div className="flex items-center gap-x-3 rounded-lg bg-muted px-4 py-3">
            <CalendarDays className="size-5 opacity-50" />
            <span>Joined {dayjs(profile?.created_at).format('DD MMM YYYY')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;
