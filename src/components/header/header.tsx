import HeaderNav from './components/header-nav';
import Logo from './components/logo';

export type HeaderProps = {
  withNav?: boolean;
};

export default function Header({ withNav = true }: HeaderProps): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>

          {withNav && <HeaderNav />}
        </div>
      </div>
    </header>
  );
}
