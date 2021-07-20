import React from 'react';
import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import add from "../../images/UnSavedLable.svg";
import addActive from "../../images/SavedLable.svg";
import deleteBtn from "../../images/DeleteMovieBtn.svg";
import deleteBtnHover from "../../images/DeleteMovieBtnHover.svg";
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'; //контекст

function MoviesCard(props) {
  const { handleDeleteMovies, movie, handleSaveMovies } = props;
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = movie.owner === currentUser.id;
  const time = `${movie.duration}`;
  const location = useLocation().pathname;
  const [like, setLike] = React.useState(false);
  const [isHover, setIsHover] = React.useState(false);
  const btnAddImg = `${like ? addActive : add}`;
  const btnDelHover = `${isHover ? deleteBtnHover : deleteBtn}`;



  const isAdded = () => { //
    // сохр фильмы
    const savedList = JSON.parse(localStorage.getItem('saved-movies'));
    console.log(savedList);
    return savedList && savedList.some((item) => item.nameRU.includes(movie.nameRU));
  }

  React.useEffect(() =>
    (isAdded()) ? setLike(true) : setLike(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , []);
  // время в минуты
  function getTimeFromMins(time) {
    let hours = Math.trunc(time / 60);
    let minutes = time % 60;
    return hours + 'ч ' + minutes + 'м';
  };
  //значок удаления при hover
  function handleDelHover() {
    setIsHover(!isHover);
  }
  //закладка
  function saveOrDeleteMovies() {
    if (isAdded()) {
      const savedList = JSON.parse(localStorage.getItem('saved-movies'));
      const cardLiked = savedList.find((item) => item.nameRU === movie.nameRU);
      if (cardLiked) {
        handleDeleteMovies(cardLiked);
        setLike(false)
      }

    }
    else {
      handleSaveMovies(movie);
      setLike(true);
    }
  }
  // удаление из избранного
  function deleteOnClose(evt) {
    handleDeleteMovies(movie);
    evt.target.closest('.card').remove();
  }

  return (
    <>
      {location === '/movies'
        && <div className="card" key={movie._id}>
          <div className="card__info">
            <div className="card__description">
              <h2 className="card__title" title={movie.nameRU}>{movie.nameRU}</h2>
              <p className="card__duration">{getTimeFromMins(time)}</p>
            </div>
            <button className="card__tab card__tab_add" type="button" style={{ backgroundImage: "url(" + btnAddImg + ")" }} onClick={saveOrDeleteMovies} alt="закладка"></button>
          </div>
          <a className="card__image" target="blank" href={movie.trailerLink}><img className="card__image" src={props.image} alt={movie.nameRU} /></a>
        </div>
      }
      {isOwn && location === '/saved-movies'
        && <div className="card">
          <div className="card__info">
            <div className="card__description">
              <h2 className="card__title" title={movie.nameRU}>{movie.nameRU}</h2>
              <p className="card__duration">{getTimeFromMins(time)}</p>
            </div>
            <button className="card__tab card__tab_del" type="button" style={{ backgroundImage: "url(" + btnDelHover + ")" }} onClick={deleteOnClose} onMouseEnter={handleDelHover} onMouseLeave={handleDelHover} alt="закладка"></button>
          </div>
          <a className="card__image" target="blank" href={movie.trailer}><img className="card__image" src={props.image} alt={movie.nameRU} /></a>
        </div>
      }



    </>
  );
}

export default MoviesCard;


