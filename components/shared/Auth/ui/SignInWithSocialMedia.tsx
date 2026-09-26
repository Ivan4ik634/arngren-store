'use client';

import { Button } from '@/components/ui/button';
import { signInWithGoogle } from '@/funcs/SignInWithGoogle';
import { signInWithX } from '@/funcs/SingInWithX';
import { FC } from 'react';
import { FaGoogle, FaXTwitter } from 'react-icons/fa6';

interface Props {}

const SignInWithSocialMedia: FC<Props> = (props) => {
  const classNames =
    'h-[62px] rounded-2xl border-[#dce5f2] bg-white text-base font-medium text-[#283a59] shadow-none hover:bg-[#f8faff]';
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Button onClick={signInWithGoogle} className={classNames} variant="outline">
        <FaGoogle className="size-5" />
        Google
      </Button>
      <Button type="button" onClick={signInWithX} className={classNames} variant="outline">
        <FaXTwitter /> X
      </Button>
    </div>
  );
};

export default SignInWithSocialMedia;
