import React from 'react';
import { useHistory } from 'react-router-dom';
import './NotFoundError.css';


function NotFoundError() {
  const history = useHistory();
  return (
    <section className="not-found-error">
      <div className="not-found-error__text">
        <span className="not-found-error__code">404</span>
        <p className="not-found-error__description">Страница не найдена</p>
      </div>
      <button onClick={() => history.goBack()} className="not-found-error__back">Назад</button>
    </section>
  );
}

export default NotFoundError;