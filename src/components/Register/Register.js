import React from 'react';
import logo from '../../images/logo__COLOR_main-1.svg';
import { Link } from 'react-router-dom';
import './Register.css';

function Register(props) {
  return (
    <>
      <div className="reg">
        <form className="reg-form"
          noValidate>
          <Link className="reg-form__logo-link" to='/'> <img src={logo} alt="Логотип" className="reg-form__logo" /> </Link>
          <h1 className="reg-form__title">Добро пожаловать!</h1>
          <label className="reg-form__label">Имя</label>
          <input className="reg-form__input"
            minLength="2"
            maxLength="30"
            type="text"
            name="name"
            required
            autoComplete="off" />
          <label className="reg-form__label">E-mail</label>
          <input className="reg-form__input"
            minLength="2"
            maxLength="30"
            type="email"
            name="email"
            id="email"
            required
            autoComplete="off"
          />
          <label className="reg-form__label">Пароль</label>
          <input className="reg-form__input"
            minLength="4"
            type="password"
            name="password"
            id="password"
            required
            autoComplete="off"
          />
          <button className="reg-form__submit" type="submit">Зарегистрироваться</button>
          <span className="reg-form__text">Уже зарегистрированы?&nbsp;<Link to="/signin" className="reg-form__link">Войти</Link></span>
        </form>
      </div>
    </>
  );
}

export default Register;