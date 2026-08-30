'use client';

import { Button } from '@/components/ui/button';
import { Calendar, Globe, Mail, Pen, User } from 'lucide-react';
import { FC } from 'react';

interface Props {}

const ProfilePage: FC<Props> = (props) => {
  return (
    <div>
      <h1 className="font-bold text-2xl">Profile</h1>
      <p className="opacity-50">Manage your personal information and account settings</p>
      <div className="mt-5 flex items-center">
        <img src="design.png" className="w-[200px] rounded-full aspect-square" />
        <div className="ml-5 space-y-3 w-full">
          <div className="flex justify-between">
            <h1 className="font-bold text-3xl">John Doe</h1>
            <Button variant="outline">
              <Pen />
              Edit profile
            </Button>
          </div>
          <p className="opacity-50">johndoe@me.com</p>
          <p>Member since May 24 2023</p>
        </div>
      </div>
      {/*** Тут надо будет сделать масив с иконками и какая категория, потому через масив персональныйх данных просто перебирать ***/}
      <div className=" mt-10">
        <div className="flex justify-between">
          <h1 className="font-bold text-2xl">Personal Information</h1>
          <Button variant="outline">Edit</Button>
        </div>
        <div className="mt-3">
          <div className="grid items-center border-b grid-cols-[400px_100px] w-full py-3 px-4">
            <div className="flex items-center">
              <div className="bg-primary/20 rounded-[5px] p-3 mr-3">
                <User />
              </div>
              <p>Name</p>
            </div>
            <div>John Doe</div>
          </div>
          <div className="grid items-center border-b grid-cols-[400px_100px] w-full py-3 px-4">
            <div className="flex items-center">
              <div className="bg-primary/20 rounded-[5px] p-3 mr-3">
                <Mail />
              </div>
              <p>Email</p>
            </div>
            <div>Johndoe@me.com</div>
          </div>
          <div className="grid items-center border-b grid-cols-[400px_100px] w-full py-3 px-4">
            <div className="flex items-center">
              <div className="bg-primary/20 rounded-[5px] p-3 mr-3">
                <Calendar />
              </div>
              <p>Date of birth</p>
            </div>
            <div>24 May 1990 </div>
          </div>
          <div className="items-center grid border-b grid-cols-[400px_100px] w-full py-3 px-4">
            <div className="flex items-center">
              <div className="bg-primary/20 rounded-[5px] p-3 mr-3">
                <User />
              </div>
              <p>Gender</p>
            </div>
            <div>Male</div>
          </div>
          <div className="items-center grid  grid-cols-[400px_100px] w-full py-3 px-4">
            <div className="flex items-center">
              <div className="bg-primary/20 rounded-[5px] p-3 mr-3">
                <Globe />
              </div>
              <p>Language</p>
            </div>
            <div>English</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
