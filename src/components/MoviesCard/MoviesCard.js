/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import moviePicture from '../../images/CardImage.png';
import add from "../../images/UnSavedLable.svg";
import addActive from "../../images/SavedLable.svg";
import deleteBtn from "../../images/DeleteMovieBtn.svg"
import deleteBtnHover from "../../images/DeleteMovieBtnHover.svg"



function MoviesCard() {

  const location = useLocation().pathname;
  const [isLiked, setIsLiked] = React.useState(false);
  const [isHover, setIsHover] = React.useState(false);
  const btnAddImg = `${isLiked ? addActive : add}`;
  const btnDelHover = `${isHover ? deleteBtnHover : deleteBtn}`;

  function handleLikeClick() {
    setIsLiked(!isLiked);
  }

  function handleDelHover() {
    setIsHover(!isHover);
  }
  return (
    (
      location === "/movies"
    ) ?
      <div className="card">
        <div className="card__info">
          <div className="card__description">
            <h2 className="card__title">33 слова о дизайне</h2>
            <p className="card__duration">1ч 47м</p>
          </div>
          <button className="card__tab card__tab_add" type="button" style={{ backgroundImage: "url(" + btnAddImg + ")" }} onClick={handleLikeClick} alt="закладка"></button>
        </div>
        <a className="card__image" src={moviePicture}></a>
      </div>
      :
      <div className="card">
        <div className="card__info">
          <div className="card__description">
            <h2 className="card__title">33 слова о дизайне</h2>
            <p className="card__duration">1ч 47м</p>
          </div>
          <button className="card__tab card__tab_del" type="button" style={{ backgroundImage: "url(" + btnDelHover + ")" }} onMouseEnter={handleDelHover} onMouseLeave={handleDelHover} alt="закладка"></button>
        </div>
        <a className="card__image" src={moviePicture}></a>
      </div>

  );
}

export default MoviesCard;


