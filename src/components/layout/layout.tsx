import Footer from '@components/footer/footer';
import Header from '@components/header/header';
import type { PropsWithChildren } from 'react';
import type { HeaderProps } from '../header/header';

type LayoutProps = PropsWithChildren<{
  showFooter?: boolean;
  className?: string;
  headerProps?: HeaderProps;
}>;

export default function Layout({
  showFooter,
  children,
  className,
  headerProps,
}: LayoutProps): JSX.Element {
  return (
    <div className={className}>
      <Header {...headerProps} />
      {children}
      {showFooter && <Footer />}
    </div>
  );
}
