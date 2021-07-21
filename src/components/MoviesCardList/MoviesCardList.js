import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard'
import { useLocation } from 'react-router-dom';

function MoviesCardList(props) {
  const location = useLocation().pathname;
  const { userData, currentUser, getUserContent, handleSetMovies, resultMessage, isLoading, handleSaveMovies, handleDeleteMovies, searchShortMovies, checkboxOn, movies, searchSubmit, renderedMovies, setSearchSubmit } = props;

  function handleCheckBox() {
    if (checkboxOn === false) {
      getSavedMassive();
    }
  }

  // массив для /saved-movies
  function getSavedMassive() {
    const massive = JSON.parse(localStorage.getItem('saved-movies'));
    if (checkboxOn === true) {
      const massiveShort = searchShortMovies(massive);
      return massiveShort;
    }
    else if (checkboxOn === false) {
      return massive;
    }
  }
  const newArray = getSavedMassive();

  React.useEffect(() => {
    location === '/saved-movies' && setSearchSubmit(false) && getUserContent();
    getSavedMassive();
    handleCheckBox();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    (location === "/movies")
      ?
      <div className="movies__card-list" id="allMovies">
        {(renderedMovies === undefined || renderedMovies.length === 0) ?
          (isLoading ? <p className="card-list__text"></p> : <p className="card-list__text">{resultMessage}</p>) : props.renderedMovies.map((movie) => (
            <MoviesCard
              userData={userData}
              handleDeleteMovies={handleDeleteMovies}
              movie={movie}
              handleSaveMovies={handleSaveMovies}
              key={movie._id}
              handleSetMovies={handleSetMovies}
              image={!!props.imageUrl ? props.imageUrl.concat(movie.image.url) : movie.image}
            />
          ))}
      </div>
      :
      <div className="movies__card-list" id="savedMovies" >
        {
          (searchSubmit) ?
            ((movies === undefined || movies === null || movies.length === 0) ?
              (isLoading ? <p className="card-list__text"></p> : <p className="card-list__text">{resultMessage}</p>) : movies.map((movie) => (
                <MoviesCard
                  userData={userData}
                  currentUser={currentUser}
                  movie={movie}
                  owner={movie.owner}
                  key={movie._id}
                  handleSetMovies={handleSetMovies}
                  image={!!props.imageUrl ? props.imageUrl.concat(movie.image.url) : movie.image} />)))
            :
            ((newArray === undefined || newArray === null || newArray.length === 0) ?
              (isLoading ? <p className="card-list__text"></p> : <p className="card-list__text">{resultMessage}</p>) : newArray.map((movie) => (
                <MoviesCard
                  userData={userData}
                  movie={movie}
                  owner={movie.owner}
                  key={movie._id}
                  handleDeleteMovies={handleDeleteMovies}
                  handleSetMovies={handleSetMovies}
                  image={!!props.imageUrl ? props.imageUrl.concat(movie.image.url) : movie.image} />)))
        }
      </div>
  );
}

export default MoviesCardList;

