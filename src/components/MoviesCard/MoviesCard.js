import React, { useState } from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import add from "../../images/UnSavedLable.svg";
import addActive from "../../images/SavedLable.svg";
import deleteBtn from "../../images/DeleteMovieBtn.svg";
import deleteBtnHover from "../../images/DeleteMovieBtnHover.svg";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'; //контекст

function MoviesCard(props) {
  const { addMovieHandler, image, removeMovieHandler, data } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const location = useLocation();
  const time = `${data.duration}`;
  const [isHover, setIsHover] = React.useState(false);
  const btnDelHover = `${isHover ? deleteBtnHover : deleteBtn}`;

  const [isLiked, setIsLiked] = useState( ///использование стейта как написано в ТЗ к работе, проверить
    currentUser.savedMoviesArray.findIndex(item => item.movieId === props.data.id) > -1); 

  //значок удаления при hover
  function handleDelHover() {
    setIsHover(!isHover);
  }

  function getTimeFromMins(time) {
    let hours = Math.trunc(time / 60);
    let minutes = time % 60;
    return hours + 'ч ' + minutes + 'м';
  };

  function handleLikeClick() {
    addMovieHandler(data);
    setIsLiked(true);
  }

  function handleDisLikeClick() {
    setIsLiked(false);
    removeMovieHandler(data);
  }

  return (
    
    <div className="card" >
      <div className="card__info">
        <div className="card__description">
          <h2 className="card__title" title={data.nameRU + ".  " + data.description}>{data.nameRU}</h2>
          <p className="card__duration">{getTimeFromMins(time)}</p>
        </div>
        {location.pathname === '/movies' ?
          (isLiked ?
            <button
              className="card__tab card__tab_add"
              type="button"
              style={{ backgroundImage: "url(" + addActive + ")" }}
              onClick={handleDisLikeClick}
              alt="закладка">
            </button>
            :
            <button
              className="card__tab card__tab_add"
              type="button"
              style={{ backgroundImage: "url(" + add + ")" }}
              onClick={handleLikeClick}
              alt="закладка">
            </button>)
          :
          <button
            className="card__tab card__tab_add"
            type="button"
            style={{ backgroundImage: "url(" + btnDelHover + ")" }}
            onClick={handleDisLikeClick}
            onMouseEnter={handleDelHover} onMouseLeave={handleDelHover}
            alt="закладка">
          </button>
        }
      </div>
      <a className="card__image" target="blank" href={data.trailerLink}><img className="card__image" src={image} alt={data.nameRU} /></a>
    </div>
   
  );
}

export default MoviesCard;


