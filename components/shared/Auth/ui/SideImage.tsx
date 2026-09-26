'use client';

import Image from 'next/image';
import { FC } from 'react';

interface Props {}

const SideImage: FC<Props> = (props) => {
  return (
    <aside className="relative hidden overflow-hidden bg-[radial-gradient(circle_at_48%_35%,#ffffff_0%,#eef4fe_40%,#e5edf9_100%)] px-[clamp(3rem,6vw,6rem)] py-14 lg:flex lg:flex-col">
      <Image
        src="/logo.png"
        alt="ARNGREN"
        width={758}
        height={122}
        priority
        className="w-[265px]"
      />
      <div className="pointer-events-none absolute inset-x-[8%] top-[14%] bottom-[23%]">
        <Image
          src="/design-login.png"
          alt="Products available in the Arngren Store"
          fill
          priority
          sizes="50vw"
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
          ARNGREN STORE - your trusted marketplace for the best products, fast delivery and secure
          purchases.
        </p>
      </div>
    </aside>
  );
};

export default SideImage;
