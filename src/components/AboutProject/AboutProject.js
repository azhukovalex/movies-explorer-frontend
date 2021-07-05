import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="about-project__title">О проекте</h2>
      <div className="about-project__main">
        <div className="about-project__block">
          <h3 className="about-project__block-title">Дипломный проект включал 5 этапов</h3>
          <p className="about-project__block-description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__block">
          <h3 className="about-project__block-title">На выполнение диплома ушло 5 недель</h3>
          <p className="about-project__block-description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className="about-project__weeks">
        <div className="about-project__week-green">1 неделя</div>
        <div className="about-project__week-dark">4 недели</div>
      </div>
      <div className="about-project__weeks">
        <div className="about-project__week-green about-project__back-front">Back-end</div>
        <div className="about-project__week-dark about-project__back-front">Front-end</div>
      </div>
    </section>
  )
}

export default AboutProject;