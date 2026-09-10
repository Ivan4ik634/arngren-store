'use client';

import { FC } from 'react';

interface Props {}

const NotFound: FC<Props> = (props) => {
  return (
    <div className="w-full h-full flex-col items-center justify-center">
      <h1 className="font-bold text-xl">Not found data</h1>
      <p>You can try to refresh the page</p>
    </div>
  );
};

export default NotFound;
