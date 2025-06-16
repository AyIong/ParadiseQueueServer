import type { ReactNode } from 'react';
import { Icon } from 'tgui-core/components';

type FooterProps = {
  children?: ReactNode;
};

export function Footer(props: FooterProps) {
  const { children } = props;

  return (
    <footer className="Footer">
      <div className="Footer__Text">
        <Icon name="copyright-o" /> SS220 Team
      </div>
      <div className="Footer__Children">{children}</div>
    </footer>
  );
}
