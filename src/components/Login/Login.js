import React from 'react';
import logo from '../../images/logo__COLOR_main-1.svg';
import { Link } from 'react-router-dom';
import './Login.css';

function Login() {

  return (
    <>
      <div className="login">
        <form className="login-form">
          <Link className="login-form__logo-link" to='/'> <img src={logo} alt="Логотип" className="login-form__logo" /> </Link>
          <h1 className="login-form__title">Рады видеть!</h1>
          <label className="login-form__label">          E-mail   </label>
          <input type="email" name="email" id="email" required className="login-form__input" />
          <label className="login-form__label">          Пароль       </label>
          <input className="login-form__input" minLength={6} type="password" name="password" id="password" required />
          <button className="login-form__submit" type="submit">Войти</button>
          <span className="login-form__text">Еще не зарегистрированы?&nbsp;<Link to="/signup" className="login-form__link">Регистрация</Link></span>
        </form>
      </div>
    </>
  );
}

export default Login;