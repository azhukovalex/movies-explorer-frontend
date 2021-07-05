import React from 'react';
import './Profile.css';
import { Link } from 'react-router-dom';

function Profile(props) {
  const { onSignOut } = props;
  return (
    <>
      <div className="profile">
        <form className="profile-form">
          <h1 className="profile-form__title">Привет, Виталий!</h1>
          <label className="profile-form__label">
            <span className="profile-form__span">Имя</span>
            <input className="profile-form__input" minLength={6} type="text" name="name" id="name" required autoComplete="off" value='Виталий'></input>
          </label>
          <div className="profile-form__line"></div>
          <label className="profile-form__label">
            <span className="profile-form__span">E-mail</span>
            <input type="email" name="email" id="email" required className="profile-form__input" autoComplete="off" value='pochta@yandex.ru'></input>
          </label>
          <button className="profile-form__submit" type="submit">Редактировать</button>
          <Link to="/signin" onClick={onSignOut} className="profile-form__link">Выйти из аккаунта</Link>
        </form>
      </div>
    </>
  );
}

export default Profile;