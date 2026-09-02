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
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">Personal Information</h1>
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
