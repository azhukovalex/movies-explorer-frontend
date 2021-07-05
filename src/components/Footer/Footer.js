import React from "react";
import "./Footer.css";
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation().pathname;
  return (
    <footer className={(location === "/movies" || location === "/saved-movies" || location === "/") ? 'footer' : "footer__none"} >
      <h2 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="footer__info">
        <p className="footer__date">&copy; 2021</p>
        <ul className="footer__socials">
          <li className="footer__social"><a className="footer__link" target="blank" href="https://praktikum.yandex.ru">Яндекс.Практикум</a></li>
          <li className="footer__social"><a className="footer__link" target="blank" href="https://github.com/">Github</a></li>
          <li className="footer__social"><a className="footer__link" target="blank" href="https://ru-ru.facebook.com/">Facebook</a></li>
        </ul>
      </div>

    </footer>
  );
}

export default Footer;


