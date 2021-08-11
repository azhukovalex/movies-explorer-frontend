import React from 'react';

import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import Preloader from '../Preloader/Preloader';

function Movies(props) {
  const {
    addMovieHandler, 
    removeMovieHandler, 
    handleSearch, 
    searchKeyWord, 
    imageUrl, 
    cardList, 
    moviesPreloader,
    setCardsList, 
    isOpenMovies, 
    setIsOpenMovies, 
    errorMoviesMessage, 
    setMoviesErrorMessage, 
    cards } = props;

  function handleSubmit(keyWord, isShort) {
    localStorage.removeItem('lastSearch');
    console.log("поиск" + keyWord)
    const found = handleSearch(cards, keyWord, isShort);
    setCardsList(found);
    localStorage.setItem('lastSearch', JSON.stringify(found));
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
            addMovieHandler={addMovieHandler}
            removeMovieHandler={removeMovieHandler}
            cardsData={cardList}
            imageUrl={imageUrl }
          />}
    </div>
  );
}

export default Movies;


