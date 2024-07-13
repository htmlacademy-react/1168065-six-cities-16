import Footer from '@components/footer/footer';
import Header from '@components/header/header';
import { PropsWithChildren } from 'react';

type LayoutProps = PropsWithChildren<{
  showFooter?: boolean;
  className?: string;
}>;

export default function Layout({
  showFooter,
  children,
  className,
}: LayoutProps): JSX.Element {
  return (
    <div className={className}>
      <Header />
      {children}
      {showFooter && <Footer />}
    </div>
  );
}
