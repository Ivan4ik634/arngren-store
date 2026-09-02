'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toast';
import { useUploadImage } from '@/hooks/useUploadImage';
import { supabase } from '@/lib/supabase';
import { userService } from '@/services/User.service';
import { useProfileStore } from '@/store/useProfileStore';
import { UserT, UserUpdateT } from '@/types/UserT';
import { Pen } from 'lucide-react';
import { FC, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  profile: UserT | null;
}

const DialogEditProfile: FC<Props> = ({ profile }) => {
  const { ref, handleImageUpload } = useUploadImage({
    init: profile?.avatar,
    action: (url) => {
      setValue('avatar', url);
    },
  });
  const { setProfileStore } = useProfileStore();
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserUpdateT>({
    defaultValues: {
      name: profile?.name,
      email: profile?.email,
      avatar: profile?.avatar,
    },
  });

  const name = watch('name');
  const avatar = watch('avatar');

  useEffect(() => {
    if (!profile) return;

    setValue('name', profile.name);
    setValue('email', profile.email);
    setValue('avatar', profile.avatar);
  }, [profile]);
  const onSubmit: SubmitHandler<UserUpdateT> = async (data) => {
    if (!profile) return;

    const { error } = await supabase.auth.updateUser({
      data: {
        ...data,
      },
    });
    if (error) return toast.close('Error updating user');

    const { error: userServiceError } = await userService.updateUser(profile.id, { ...data });
    if (userServiceError) return toast.close('Error updating user');

    setProfileStore({ ...profile, ...data });

    toast.close('User updated successfully');
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <Pen />
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
          <div className="flex items-center">
            <Avatar className="h-[75px] w-[75px]" onClick={() => ref.current?.click()}>
              <AvatarFallback>{name?.[0]?.toUpperCase()}</AvatarFallback>
              <AvatarImage src={avatar} />
            </Avatar>
            <input type="file" ref={ref} className="hidden" onChange={handleImageUpload} />
            <div className="ml-3 w-full gap-y-3 flex flex-col">
              <p>Name</p>
              <Input
                placeholder="Name"
                {...register('name', {
                  required: true,
                  minLength: { value: 3, message: 'Name must be at least 3 characters' },
                })}
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
              <p>Email</p>
              <Input
                placeholder="Email"
                {...register('email', {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'invalid email address',
                  },
                })}
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogEditProfile;
