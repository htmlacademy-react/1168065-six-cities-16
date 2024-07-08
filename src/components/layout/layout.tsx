import Footer from '@components/footer/footer';
import Header from '@components/header/header';
import { PropsWithChildren } from 'react';

type LayoutProps = PropsWithChildren<{
  showFooter?: boolean;
}>;

export default function Layout({
  showFooter,
  children,
}: LayoutProps): JSX.Element {
  return (
    <>
      <Header />
      {children}
      {showFooter && <Footer />}
    </>
  );
}
