import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, props: AppProps) => ReactNode;
};
