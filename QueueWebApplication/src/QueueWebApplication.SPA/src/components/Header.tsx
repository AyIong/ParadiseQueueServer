import type { ReactNode } from 'react';

type HeaderProps = {
  title?: string;
  buttons?: ReactNode;
};

export function Header(props: HeaderProps) {
  const { title, buttons } = props;

  return (
    <header className="Header">
      <img className="Header__Image" src="/images/ss220.png" alt="SS220 Logo" />
      <div className="Header__Title">{title}</div>
      <div className="Header__Buttons">{buttons}</div>
    </header>
  );
}
