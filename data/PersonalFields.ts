import { PersonalInformationItemT, UserT } from '@/types/UserT';
import dayjs from 'dayjs';
import { Calendar, CalendarDays, Globe, Mail, User } from 'lucide-react';

export const PersonalFields = (profile: UserT | null): PersonalInformationItemT[] => {
  return [
    {
      icon: User,
      title: 'Name',
      info: profile?.name || '',
    },
    {
      icon: Mail,
      title: 'Email',
      info: profile?.email || '',
    },
    {
      icon: Calendar,
      title: 'Date of birth',
      info: dayjs(profile?.dateOfBirth).format('DD.MM.YYYY') || '?',
    },
    {
      icon: User,
      title: 'Gender',
      info: profile?.gender || '?',
    },
    {
      icon: Globe,
      title: 'Language',
      info: profile?.language || '?',
    },
    {
      icon: CalendarDays,
      title: 'Joined',
      info: dayjs(profile?.created_at).format('DD.MM.YYYY') || '?',
    },
  ];
};
