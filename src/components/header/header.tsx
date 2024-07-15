import HeaderNav from './components/header-nav';
import Logo from './components/logo';

export default function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>

          <HeaderNav />
        </div>
      </div>
    </header>
  );
}
