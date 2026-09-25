'use client';

import { PersonalFields } from '@/data/PersonalFields';
import { PersonalInformationItemT, UserT } from '@/types/UserT';
import { FC } from 'react';
import DialogEditPersonalInformation from './DialogEditPersonalInformation';
import PersonalInformationItem from './PersonalInformationItem';

interface Props {
  profile: UserT | null;
}

const PersonalInformation: FC<Props> = ({ profile }) => {
  return (
    <div className=" mt-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold sm:text-2xl">Personal Information</h1>
        <DialogEditPersonalInformation profile={profile} />
      </div>
      <div className="mt-3">
        {PersonalFields(profile).map((item: PersonalInformationItemT, index: number) => (
          <PersonalInformationItem key={index} index={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default PersonalInformation;
