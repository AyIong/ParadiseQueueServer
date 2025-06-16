import type { ReactNode } from 'react';

type PageProps = {
  children: ReactNode;
};

export function Page(props: PageProps) {
  const { children } = props;

  return <div className="MainPage">{children}</div>;
}
