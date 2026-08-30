'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toast';
import { PAGES } from '@/configs/PAGES';
import { supabase } from '@/lib/supabase';
import { userService } from '@/services/User.service';
import { UserRegisterT } from '@/types/UserT';
import Link from 'next/link';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {}

const RegisterPage: FC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegisterT>();
  const onSubmit: SubmitHandler<UserRegisterT> = async (data) => {
    console.log('123');
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({ ...data });
    if (error?.message) return toast.close(error.message);
    if (user?.id) {
      const { error } = await userService.addUser(user.id, { name: data.name, email: data.email });
      if (error) return toast.close(error.message);
      return toast.close('Register successfully');
    }
  };
  return (
    <Card>
      <CardContent>
        <h1 className="text-2xl font-bold">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <div className="flex flex-col gap-y-4">
            <Input
              {...register('name', {
                minLength: { value: 3, message: 'Name must be at least 3 characters' },
                required: true,
              })}
              placeholder="Name"
              className="w-full"
            />
            {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            <Input
              {...register('email', {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
                required: true,
              })}
              placeholder="Email"
              className="w-full"
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
            <Input
              {...register('password', {
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                required: true,
              })}
              placeholder="Password"
              className="w-full"
            />
            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
          </div>
          <Button type="submit" className="w-full mt-5">
            Register
          </Button>
          <div className="mt-5 flex w-full justify-center">
            <p>
              Already have an account?{' '}
              <Link href={PAGES.LOGIN} className="text-primary cursor-pointer">
                Login
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterPage;
