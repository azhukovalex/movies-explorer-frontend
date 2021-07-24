import React from 'react';

import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import moviesApi from '../../utils/MoviesApi';
import Preloader from '../Preloader/Preloader';

function Movies(props) {
  const {addMovieHandler, removeMovieHandler, handleSearch, searchKeyWord, imageUrl  } = props;
  const [cards, setCards] = React.useState([]);
  const [cardList, setCardsList] = React.useState([]);
  const [moviesPreloader, setMoviesPreloader] = React.useState(false);
  const [errorMoviesMessage, setMoviesErrorMessage] = React.useState('');
  const [isOpenMovies, setIsOpenMovies] = React.useState(false);
  const [isCSS, setIsCSS] =React.useState(false);


  React.useEffect(() => {
    setMoviesPreloader(true);
    moviesApi.getAllMovies()
        .then((res) => {
          console.log("movies:" + res);
            setCards(res);
        })
        .catch((error) => {
            console.log(error);
            setIsOpenMovies(true);
            setMoviesErrorMessage('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
        })
        .finally(() => {
            setMoviesPreloader(false);
        });

}, [])


  function handleSubmit(keyWord, isShort) {
    console.log("поиск" + keyWord)
    const found = handleSearch(cards, keyWord, isShort);
    setCardsList(found);
    setIsCSS(true);
    if (found < 1) {
      setIsOpenMovies(true);
      setMoviesErrorMessage('Ничего не найдено');
    }
  }


  return (
    <div className="movies">
      <SearchForm
        handleSearch={handleSubmit}
        searchKeyWord={searchKeyWord}
        moviesPreloader={moviesPreloader}
      />
      {moviesPreloader ? <Preloader />
        :
        isOpenMovies ? <p className="card-list__text">{errorMoviesMessage}</p>
          :
          <MoviesCardList
          isCSS={isCSS}
            addMovieHandler={addMovieHandler}
            removeMovieHandler={removeMovieHandler}
            cardsData={cardList}
            imageUrl={imageUrl }
          />}
    </div>
  );
}

export default Movies;


