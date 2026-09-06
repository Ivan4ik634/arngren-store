'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC } from 'react';

interface Props {
  children: React.ReactNode;
}
const queryClient = new QueryClient();
const QueryProvider: FC<Props> = (props) => {
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
};

export default QueryProvider;
