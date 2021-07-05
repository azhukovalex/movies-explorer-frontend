import React from 'react';
import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio" >
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__links">
        <li className="portfolio__item">
          <a className="portfolio__link" target="blank" href="https://azhukovalex.github.io/how-to-learn/">Статичный сайт</a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" target="blank"  href="https://azhukovalex.github.io/russian-travel/" >Адаптивный сайт</a>
        </li>
        <li className="portfolio__item">
          <a className="portfolio__link" target="blank"  href="https://azhukovalex.github.io/mesto-react/" >Одностраничное приложение</a>
        </li>
      </ul>
    </div >
  );
}

export default Portfolio;