'use client';

import { Button } from '@/components/ui/button';
import { PAGES } from '@/configs/PAGES';
import { ValidationMessages } from '@/data/ValidationMessages';
import { supabase } from '@/lib/supabase/client';
import { UserLoginT } from '@/types/UserT';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Field } from '../ui/Field';
import SignInWithSocialMedia from '../ui/SignInWithSocialMedia';

type Props = Record<string, never>;

const LoginPage: FC<Props> = () => {
  const [typePassword, setTypePassword] = useState<'password' | 'text'>('password');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLoginT>();
  const onSubmit: SubmitHandler<UserLoginT> = async (data) => {
    console.log('123');
    const { error } = await supabase.auth.signInWithPassword(data);

    if (error?.message) return toast.error(error.message);
    toast.success('Register successfully');

    window.location.href = PAGES.HOME;
  };

  return (
    <section className="relative left-1/2 min-h-screen w-screen -translate-x-1/2 overflow-hidden bg-white text-[#0c1427]">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(620px,1fr)]">
        <aside className="relative hidden overflow-hidden bg-[radial-gradient(circle_at_48%_35%,#ffffff_0%,#eef4fe_40%,#e5edf9_100%)] px-[clamp(3rem,6vw,6rem)] py-14 lg:flex lg:flex-col">
          <Image
            src="/logo.png"
            alt="ARNGREN"
            width={758}
            height={122}
            priority
            className="w-[265px]"
          />
          <div className="pointer-events-none absolute inset-x-[8%] top-[0%] bottom-[23%]">
            <Image
              src="/design-login.png"
              alt="Products available in the Arngren Store"
              fill
              priority
              sizes="40vw"
              className="object-contain"
            />
          </div>
          <div className="relative z-10 mt-auto max-w-[430px]">
            <h2 className="text-[clamp(2.5rem,3.25vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.045em]">
              Shop smarter,
              <br />
              live better.
            </h2>
            <p className="mt-5 max-w-[390px] text-lg leading-relaxed text-[#627493]">
              ARNGREN STORE - your trusted marketplace for the best products, fast delivery and
              secure purchases.
            </p>
          </div>
        </aside>

        <div className="relative flex min-h-screen flex-col px-5 py-8 sm:px-10 sm:py-12 lg:px-[clamp(4rem,8vw,8.5rem)] lg:py-16">
          <Image
            src="/logo.png"
            alt="ARNGREN"
            width={758}
            height={122}
            priority
            className="w-[188px] lg:hidden"
          />
          <div className="my-auto w-full max-w-[526px] self-center py-12 lg:py-0">
            <div className="mb-10">
              <h1 className="text-[clamp(2.2rem,3vw,3.4rem)] font-bold leading-tight tracking-[-0.05em]">
                Welcome back!
              </h1>
              <p className="mt-3 max-w-md text-[17px] leading-relaxed text-[#667a9f] sm:text-xl">
                Log in to your ARNGREN STORE account and continue shopping.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <Field
                  icon={<Mail />}
                  placeholder="Email address"
                  error={errors.email?.message}
                  inputProps={register('email', {
                    required: ValidationMessages.EMAIL_REQUIRED,
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: ValidationMessages.EMAIL_INVALID,
                    },
                  })}
                />
                <Field
                  icon={<LockKeyhole />}
                  type={typePassword}
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
              </div>

              <Button
                type="submit"
                className="mt-6 h-16 w-full rounded-2xl bg-[#0971f9] text-lg font-semibold shadow-[0_12px_24px_rgba(9,113,249,0.2)] hover:bg-[#0062df]">
                Login <ArrowRight className="ml-3 size-5" />
              </Button>

              <div className="my-8 flex items-center gap-4 text-sm text-[#7182a0]">
                <span className="h-px flex-1 bg-[#dce5f2]" />
                <span>or</span>
                <span className="h-px flex-1 bg-[#dce5f2]" />
              </div>

              <SignInWithSocialMedia />

              <p className="mt-8 text-center text-sm text-[#7182a0] sm:text-base">
                Don&apos;t have an account?{' '}
                <Link
                  href={PAGES.REGISTER}
                  className="font-semibold text-[#096cff] hover:underline">
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
          <p className="text-center text-xs text-[#7485a3] sm:text-sm lg:absolute lg:bottom-16 lg:left-0 lg:right-0">
            © 2025 ARNGREN STORE. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
