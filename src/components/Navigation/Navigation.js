import React from 'react';
import './Navigation.css'
import { NavLink, useLocation } from 'react-router-dom';
import user from '../../images/profile__logo.svg';


function Navigation(props) {
  const [isClickedMenu, seIisClickedMenu] = React.useState(false);
  const location = useLocation().pathname;
  const NavClassName = `${isClickedMenu ? "header__nav header__nav-mob_visible" : " header__nav header__nav-mob_invisible"}`;

  function handleMenuClick() {
    seIisClickedMenu(!isClickedMenu);
  }

  return (
    (
      location === "/movies" ||
      location === "/saved-movies" ||
      location === "/profile"
    ) ?

      <nav className="header__nav">
        <button className="header__burger-btn header__burger-btn_invisible" onClick={handleMenuClick}></button>
        <div className={NavClassName}>
          <button className="header__nav-close-btn" onClick={handleMenuClick} ></button>
          <div className="header__nav-links">
            <NavLink to="/" className="header__nav-movies header__nav-main" onClick={handleMenuClick}>Главная</NavLink>
            <NavLink to="/movies" className="header__nav-movies" onClick={handleMenuClick}>Фильмы</NavLink>
            <NavLink to="/saved-movies" className="header__nav-saved" onClick={handleMenuClick}>Сохраненные фильмы</NavLink>
          </div>
          <NavLink to="/profile" className="header__nav-profile" >Аккаунт<img className='nav__user-icon' src={user} alt='Фото пользователя' /></NavLink>
        </div>
      </nav>
      :
      <nav className="header__nav">
        <NavLink to="/signup" className="header__nav-item" >Регистрация</NavLink>
        <NavLink to="/signin" className="header__nav-link">Войти</NavLink>
      </nav>
  );
}

export default Navigation;

