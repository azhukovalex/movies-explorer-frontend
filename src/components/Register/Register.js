import React from 'react';
import logo from '../../images/logo__COLOR_main-1.svg';
import { Link } from 'react-router-dom';
import './Register.css';
import { useFormWithValidation } from '../../utils/utils';
import Preloader from '../Preloader/Preloader';

function Register(props) {
  const { onRegister, isPreloader } = props;
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();

  const ClassNameDisabled = `${isValid ? "reg-form__submit" : "reg-form__submit reg-form__submit__error"}`;
  const NavClassPassword = `${isValid ? "reg-form__input" : "reg-form__input reg-form__input__error"}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values);
    resetForm();
  };


  return (
      <div className="reg">
        {isPreloader ? <Preloader />
        
          :

          <form className="reg-form" onSubmit={handleSubmit} noValidate>
            <Link className="reg-form__logo-link" to='/'> <img src={logo} alt="Логотип" className="reg-form__logo" /> </Link>
            <h1 className="reg-form__title">Добро пожаловать!</h1>
            <label className="reg-form__label">Имя</label>
            <input className="reg-form__input"
              onChange={handleChange}
              minLength="2"
              maxLength="30"
              type="text"
              name="name"
              required
              autoComplete="off"
              value={values.name}
              disabled={isPreloader} />
            <span className="reg-form__valid-text reg-form__valid-text_non-valid">{errors.name || ''}</span>
            <label className="reg-form__label">E-mail</label>
            <input className="reg-form__input"
              onChange={handleChange}
              minLength="2"
              maxLength="30"
              type="email"
              name="email"
              id="email"
              required
              autoComplete="off"
              value={values.email}
              disabled={isPreloader} 
            />
            <span className="reg-form__valid-text reg-form__valid-text_non-valid">{errors.email || ''}</span>
            <label className="reg-form__label">Пароль</label>
            <input className={NavClassPassword}
              onChange={handleChange}
              minLength="6"
              type="password"
              name="password"
              id="password"
              required
              autoComplete="off"
              value={values.password}
              disabled={isPreloader} 
            />
            <span className="reg-form__valid-text reg-form__valid-text_non-valid">{errors.password || ''}</span>
            <button className={ClassNameDisabled} type="submit" disabled={!isValid || isPreloader}>Зарегистрироваться</button>
            <span className="reg-form__text">Уже зарегистрированы?&nbsp;<Link to="/signin" className="reg-form__link">Войти</Link></span>
          </form>
        }
      </div>
  );
}

export default Register;