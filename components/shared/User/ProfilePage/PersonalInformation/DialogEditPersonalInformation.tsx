'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/toast';
import { languages } from '@/data/Languages';
import { supabase } from '@/lib/supabase';
import { userService } from '@/services/User.service';
import { useProfileStore } from '@/store/useProfileStore';
import { UserT, UserUpdatePersonalInformationT } from '@/types/UserT';
import dayjs from 'dayjs';
import { ArrowDown, Pen } from 'lucide-react';
import { FC, useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  profile: UserT | null;
}

const DialogEditPersonalInformation: FC<Props> = ({ profile }) => {
  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserUpdatePersonalInformationT>({
    defaultValues: {
      name: profile?.name,
      email: profile?.email,
      dateOfBirth: new Date(profile?.dateOfBirth || ''),
      gender: profile?.gender || 'other',
      language: profile?.language || 'English',
    },
  });
  const { setProfileStore } = useProfileStore();

  useEffect(() => {
    if (!profile) return;

    setValue('name', profile.name);
    setValue('email', profile.email);
    setValue('dateOfBirth', new Date(profile.dateOfBirth));
    setValue('gender', profile.gender);
    setValue('language', profile.language);
  }, [profile]);

  const onSubmit: SubmitHandler<UserUpdatePersonalInformationT> = async (data) => {
    if (!profile) return;

    const { error } = await supabase.auth.updateUser({
      data: {
        ...data,
      },
    });
    if (error) return toast.close('Error updating user');

    const { error: userServiceError } = await userService.updateUser(profile.id, { ...data });
    if (userServiceError) return toast.close('Error updating user');

    setProfileStore({
      ...profile,
      ...data,
      dateOfBirth: dayjs(data.dateOfBirth).format('DD MMM YYYY'),
    });

    toast.close('User updated successfully');
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <Pen />
          Edit personal information
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit personal information</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-3">
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
          <p>Date of birth</p>
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger>
                  <Button type="button" variant="outline" className="w-full justify-between">
                    {field.value
                      ? dayjs(field.value, 'dd.MM.yyyy').format('DD.MM.YYYY')
                      : 'Date of birth'}

                    <ArrowDown />
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    captionLayout="dropdown"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
            )}
          />
          <div className="flex gap-x-5">
            <div>
              <p className="mb-2">Gender</p>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div>
              <p className="mb-2">Language</p>
              <Controller
                control={control}
                name="language"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>

                    <SelectContent>
                      {languages.map((lang) => (
                        <SelectItem key={lang.label} value={lang.label}>
                          {lang.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
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

export default DialogEditPersonalInformation;
