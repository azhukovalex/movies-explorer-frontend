import React from 'react';
import logo from '../../images/logo__COLOR_main-1.svg';
import logoHover from '../../images/logo-hover.svg';
import Navigation from '../Navigation/Navigation';
import './Header.css';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
  const { LoggedIn } = props;
  const location = useLocation().pathname;
  const [isHover, setIsHover] = React.useState(false);
  const btnLogoHover = `${isHover ? logoHover : logo}`;

  function handleLogoHover() {
    setIsHover(!isHover);
  }


  return (
    <header className={(location === "/") ? "header" : (location === "/movies" || location === "/saved-movies" || location === "/profile") ? "header header__dark" : "header__none"} >
      <Link to='/'> <img className="header__logo" src={btnLogoHover} alt="Логотип" onMouseEnter={handleLogoHover} onMouseLeave={handleLogoHover}></img></Link>
      <Navigation
          LoggedIn={LoggedIn} />
    </header>
  );
}

export default Header;

