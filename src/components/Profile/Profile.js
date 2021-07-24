import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../utils/utils';
import Preloader from '../Preloader/Preloader';

function Profile(props) {
  const { handleLogOut, onUpdateUser, isPreloader } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const ClassBtnDisabled = `${isValid ? "profile-form__submit" : "profile-form__submit profile-form__submit__error"}`;

  React.useEffect(() => {
    if (currentUser) resetForm(currentUser);
  }, [currentUser, resetForm]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser(values);
    setTimeout(function () { window.location.reload(); }, 1500);
  }

  return (
    <>
      <div className="profile">
        {isPreloader ? <Preloader />

          :

          <form className="profile-form" onSubmit={handleSubmit}>
            <h1 className="profile-form__title">Привет, {values.name}!</h1>
            <label className="profile-form__label">
              <label className="profile-form__span">Имя</label>
              <input className="profile-form__input" minLength={2} type="text" name="name" id="name" required autoComplete="off" value={values.name} onChange={handleChange} disabled={isPreloader}></input>
              <span className="profile__valid-name profile__valid-name_non-valid">{errors.name || ''}</span>
            </label>
            <div className="profile-form__line"></div>
            <label className="profile-form__label">
              <label className="profile-form__span">E-mail</label>
              <input type="email" name="email" id="email" required className="profile-form__input" autoComplete="off" value={values.email} onChange={handleChange} disabled={isPreloader}></input>
              <span className="profile__valid-email profile__valid-email_non-valid">{errors.email || ''}</span>
            </label>
            <button className={ClassBtnDisabled} type="submit" disabled={!isValid || isPreloader}>Редактировать</button>
            <Link to="/signin" onClick={handleLogOut} className="profile-form__link">Выйти из аккаунта</Link>
          </form>
        }
      </div>
    </>
  );
}

export default Profile;