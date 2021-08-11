import React from 'react';
import MyPhoto from '../../images/me.jfif'
import './AboutMe.css';

function AboutMe() {
  return (
    <div className="about-me" >
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__main">
        <div className="about-me__info">
          <h3 className="about-me__name">Алексей</h3>
          <p className="about-me__profession">Начинающий фронтенд-разработчик, 31 год</p>
          <p className="about-me__text">Я живу в Москве. Работаю авиатехнологом в сфере авиации в отделе разработок. Мне нравится моя работа, но программирование интереснее, поэтому собираюсь сменить сферу деятельности.  В данный момент ищу работу именно в IT. </p>
          <ul className="about-me__socials">
            <li className="about-me__social"><a className="about-me__link"  target="blank" href="https://ru-ru.facebook.com/">Facebook</a></li>
            <li className="about-me__social"><a className="about-me__link" target="blank" href="https://github.com/azhukovalex">Github</a></li>
          </ul>
        </div>
        <img className="about-me__photo" src={MyPhoto} alt="Фото автора" />
      </div>

    </div>
  );
}

export default AboutMe;
