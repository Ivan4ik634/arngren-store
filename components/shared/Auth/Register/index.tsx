'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { PAGES } from '@/configs/PAGES';
import { ValidationMessages } from '@/data/ValidationMessages';
import { supabase } from '@/lib/supabase/client';
import { userService } from '@/services/User.service';
import { UserRegisterT } from '@/types/UserT';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Field } from '../ui/Field';
import SideImage from '../ui/SideImage';
import SignInWithSocialMedia from '../ui/SignInWithSocialMedia';

type RegisterFormT = UserRegisterT & { confirmPassword: string; isAgree: boolean };

const RegisterPage: FC = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormT>();
  const [typePassword, setTypePassword] = useState<'password' | 'text'>('password');
  const [typePasswordConfirm, setTypePasswordConfirm] = useState<'password' | 'text'>('password');

  const onSubmit: SubmitHandler<RegisterFormT> = async (formData) => {
    const data: UserRegisterT = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({ ...data });

    if (error?.message) return toast.error(error.message);
    if (user?.id) {
      const { error } = await userService.create(user.id, { name: data.name, email: data.email });
      if (error) return toast.error(error.message);

      toast.success('Register successfully');
      window.location.href = PAGES.HOME;
    }
  };

  return (
    <section className="relative left-1/2 min-h-screen w-screen -translate-x-1/2 overflow-hidden bg-white text-[#0c1427]">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(620px,1fr)]">
        <SideImage />

        <div className="relative flex min-h-screen flex-col px-5 py-8 sm:px-10 sm:py-12 lg:px-[clamp(4rem,8vw,8.5rem)] lg:py-12">
          <Image
            src="/logo.png"
            alt="ARNGREN"
            width={758}
            height={122}
            priority
            className="w-[188px] lg:hidden"
          />
          <div className="my-auto w-full max-w-[542px] self-center py-10 lg:py-0">
            <div className="mb-8">
              <h1 className="text-[clamp(2.2rem,3vw,3.4rem)] font-bold leading-tight tracking-[-0.05em]">
                Create your account
              </h1>
              <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-[#667a9f] sm:text-xl">
                Join ARNGREN STORE and get access to exclusive deals, fast delivery and a better
                shopping experience.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-3.5">
                <Field
                  icon={<UserRound />}
                  placeholder="Full name"
                  error={errors.name?.message}
                  inputProps={register('name', {
                    minLength: { value: 3, message: ValidationMessages.NAME_MIN_LENGTH },
                    required: ValidationMessages.NAME_REQUIRED,
                  })}
                />
                <Field
                  icon={<Mail />}
                  placeholder="Email address"
                  error={errors.email?.message}
                  inputProps={register('email', {
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: ValidationMessages.EMAIL_INVALID,
                    },
                    required: ValidationMessages.EMAIL_REQUIRED,
                  })}
                />
                <Field
                  type={typePassword}
                  icon={<LockKeyhole />}
                  trailingIcon={
                    typePassword === 'text' ? (
                      <Eye onClick={() => setTypePassword('password')} className="cursor-pointer" />
                    ) : (
                      <EyeOff onClick={() => setTypePassword('text')} className="cursor-pointer" />
                    )
                  }
                  placeholder="Password"
                  error={errors.password?.message}
                  inputProps={register('password', {
                    minLength: { value: 6, message: ValidationMessages.PASSWORD_MIN_LENGTH },
                    required: ValidationMessages.PASSWORD_REQUIRED,
                  })}
                />
                <Field
                  type={typePasswordConfirm}
                  icon={<LockKeyhole />}
                  trailingIcon={
                    typePasswordConfirm === 'text' ? (
                      <Eye
                        onClick={() => setTypePasswordConfirm('password')}
                        className="cursor-pointer"
                      />
                    ) : (
                      <EyeOff
                        onClick={() => setTypePasswordConfirm('text')}
                        className="cursor-pointer"
                      />
                    )
                  }
                  placeholder="Confirm password"
                  error={errors.confirmPassword?.message}
                  inputProps={register('confirmPassword', {
                    deps: 'password',
                    required: ValidationMessages.CONFIRM_PASSWORD_REQUIRED,
                    validate: (value) =>
                      value === getValues('password') ||
                      ValidationMessages.CONFIRM_PASSWORD_MISMATCH,
                  })}
                />
              </div>

              <label className="mt-5 flex cursor-pointer items-center gap-3 text-sm text-[#687b9b] sm:text-base">
                <Checkbox
                  {...register('isAgree', { required: ValidationMessages.AGREE_REQUIRED })}
                  className="size-6 rounded-md border-[#cfdbea] accent-[#0971f9]"
                />
                <span>
                  I agree to the{' '}
                  <Link href={PAGES.TERMS}>
                    <span className="font-medium text-[#096cff]">Terms of Service</span>{' '}
                  </Link>
                  and{' '}
                  <Link href={PAGES.PRIVACY_POLICY}>
                    <span className="font-medium text-[#096cff]">Privacy Policy</span>
                  </Link>
                </span>
              </label>
              {errors.isAgree?.message && (
                <p className="mt-1 text-sm text-destructive">{errors.isAgree?.message}</p>
              )}

              <Button
                type="submit"
                className="mt-6 h-[62px] w-full rounded-2xl bg-[#0971f9] text-lg font-semibold shadow-[0_12px_24px_rgba(9,113,249,0.2)] hover:bg-[#0062df]">
                Create account <ArrowRight className="ml-3 size-5" />
              </Button>
              <div className="my-7 flex items-center gap-4 text-sm text-[#7182a0]">
                <span className="h-px flex-1 bg-[#dce5f2]" />
                <span>or</span>
                <span className="h-px flex-1 bg-[#dce5f2]" />
              </div>
              <SignInWithSocialMedia />

              <p className="mt-7 text-center text-sm text-[#7182a0] sm:text-base">
                Already have an account?{' '}
                <Link href={PAGES.LOGIN} className="font-semibold text-[#096cff] hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          </div>
          <p className="text-center text-xs text-[#7485a3] sm:text-sm lg:absolute lg:bottom-12 lg:left-0 lg:right-0">
            © 2025 ARNGREN STORE. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
