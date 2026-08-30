'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/toast';
import { PAGES } from '@/configs/PAGES';
import { supabase } from '@/lib/supabase';
import { UserLoginT } from '@/types/UserT';
import Link from 'next/link';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {}

const LoginPage: FC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginT>();
  const onSubmit: SubmitHandler<UserLoginT> = async (data) => {
    console.log('123');
    const { error } = await supabase.auth.signInWithPassword(data);

    if (error?.message) return toast.close(error.message);

    return toast.close('Register successfully');
  };
  return (
    <Card>
      <CardContent>
        <h1 className="text-2xl font-bold">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <div className="flex flex-col gap-y-4">
            <Input
              {...register('email', {
                required: true,
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address',
                },
              })}
              placeholder="Email"
              className="w-full"
            />
            {errors.email && <p className="text-destructive">{errors.email.message}</p>}
            <Input
              {...register('password', {
                minLength: { value: 6, message: 'Password must be at least 6 characters' },
                required: true,
              })}
              placeholder="Password"
              className="w-full"
            />
            {errors.password && <p className="text-destructive">{errors.password.message}</p>}
          </div>
          <Button type="submit" className="w-full mt-5">
            Login
          </Button>
          <div className="mt-5 flex w-full justify-center">
            <p>
              Already have an account?{' '}
              <Link href={PAGES.REGISTER} className="text-primary cursor-pointer">
                Register
              </Link>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginPage;
