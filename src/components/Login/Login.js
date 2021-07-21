import React from 'react';
import logo from '../../images/logo__COLOR_main-1.svg';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import { useFormWithValidation } from '../../utils/utils';

function Login(props) {
  const { onLogin, setIsLoggedIn } = props;
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const NavClassPassword = `${isValid ? "login-form__input" : "login-form__input login-form__input__error"}`;
  const ClassNameDisabled = `${isValid ? "login-form__submit" : "login-form__submit login-form__submit__error"}`;  
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values).then(() => {
      history.push("/");
    })
      .catch((err) => {
        console.log(err);
      })
    resetForm();
  };

  React.useEffect(() => {
    setIsLoggedIn(false);
  }, [setIsLoggedIn]);


  return (
    <>
      <div className="login">
        <form className="login-form" onSubmit={handleSubmit}>
          <Link className="login-form__logo-link" to='/'> <img src={logo} alt="Логотип" className="login-form__logo" /> </Link>
          <h1 className="login-form__title">Рады видеть!</h1>
          <label className="login-form__label">          E-mail   </label>
          <input type="email" name="email" id="email" required className="login-form__input" value={values.email} onChange={handleChange} />
          <span className="login-form__valid-text login-form__valid-text_non-valid">{errors.email || ''}</span>
          <label className="login-form__label">          Пароль       </label>
          <input className={NavClassPassword} minLength={6} type="password" name="password" id="password" value={values.password} required onChange={handleChange} />
          <span className="login-form__valid-text login-form__valid-text_non-valid">{errors.password || ''}</span>
          <button className={ClassNameDisabled} type="submit" disabled={!isValid}>Войти</button>
          <span className="login-form__text">Еще не зарегистрированы?&nbsp;<Link to="/signup" className="login-form__link">Регистрация</Link></span>
        </form>
      </div>
    </>
  );
}

export default Login;