import React from 'react';
import logo from '../../images/logo__COLOR_main-1.svg';
import logoHover from '../../images/logo-hover.svg';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import { useFormWithValidation } from '../../utils/utils';
import Preloader from '../Preloader/Preloader';

function Login(props) {
  const { onLogin, isPreloader } = props;
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const NavClassPassword = `${isValid ? "login-form__input" : "login-form__input login-form__input__error"}`;
  const ClassNameDisabled = `${isValid ? "login-form__submit" : "login-form__submit login-form__submit__error"}`;
  const history = useHistory();
  const [isHover, setIsHover] = React.useState(false);
  const btnLogoHover = `${isHover ? logoHover : logo}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values).then(() => {
      history.push("/movies");
    })
      .catch((err) => {
        console.log(err);
      })
    resetForm();
  };

  function handleLogoHover() {
    setIsHover(!isHover);
  }

  return (
      <div className="login">
        {isPreloader ? <Preloader />

          :

          <form className="login-form" onSubmit={handleSubmit}>
            <Link className="login-form__logo-link" to='/'> <img src={btnLogoHover} alt="Логотип" className="login-form__logo" onMouseEnter={handleLogoHover} onMouseLeave={handleLogoHover} /> </Link>
            <h1 className="login-form__title">Рады видеть!</h1>
            <label className="login-form__label">          E-mail   </label>
            <input className="login-form__input"
              type="email"
              name="email"
              id="email"
              required
              value={values.email}
              disabled={isPreloader} 
              onChange={handleChange} />
            <div className="login-form__valid-text login-form__valid-text_non-valid">{errors.email || ''}</div>
            <label className="login-form__label">Пароль</label>
            <input className={NavClassPassword}
              minLength={6}
              type="password"
              name="password"
              id="password"
              value={values.password}
              required
              onChange={handleChange} 
              disabled={isPreloader} />
            <div className="login-form__valid-text login-form__valid-text_non-valid">{errors.password || ''}</div>
            <button className={ClassNameDisabled}
              type="submit"
              disabled={!isValid || isPreloader}>Войти</button>
            <div className="login-form__text">Еще не зарегистрированы?&nbsp;<Link to="/signup" className="login-form__link">Регистрация</Link></div>
          </form>
        }
      </div>
  );
}

export default Login;