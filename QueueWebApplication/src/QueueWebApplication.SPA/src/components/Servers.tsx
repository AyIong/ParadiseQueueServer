import type { ReactNode } from 'react';

type ServersProps = {
  children: ReactNode;
};

export function Servers(props: ServersProps) {
  const { children } = props;

  return <div className="Servers">{children}</div>;
}
