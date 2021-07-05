import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard'
import { useLocation } from 'react-router-dom';

function MoviesCardList() {
  const location = useLocation().pathname;




  return (
    (
      location === "/movies"
    ) ? <div className="movies__card-list">
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
    </div>
    :
    <div className="movies__card-list">
      <MoviesCard />
      <MoviesCard />
      <MoviesCard />
    </div>
  );
}

export default MoviesCardList;
