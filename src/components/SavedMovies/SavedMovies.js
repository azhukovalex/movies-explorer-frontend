import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';

function SavedMovies(props) {
  const [searchSubmit, setSearchSubmit] = React.useState(false);
  const [checkboxOn, setcheckboxOn] = React.useState(false);

  const { userData, currentUser, getUserContent, isLoading, movies, handleSetMovies, handleDeleteMovies, handleSaveMovies, resultMessage, imageUrl, handleSearchShortMovies, renderedMovies, searchShortMovies } = props;

  return (
    <div className="movies__main-saved">
      {isLoading && <Preloader />}
      <SearchForm
        handleSetMovies={handleSetMovies}
        handleSearchShortMovies={handleSearchShortMovies}
        setSearchSubmit={setSearchSubmit}
        setcheckboxOn={setcheckboxOn}
        checkboxOn={checkboxOn} />
      <MoviesCardList
        currentUser={currentUser}
        userData={userData}
        getUserContent={getUserContent}
        searchShortMovies={searchShortMovies}
        handleDeleteMovies={handleDeleteMovies}
        searchSubmit={searchSubmit}
        setSearchSubmit={setSearchSubmit}
        handleSaveMovies={handleSaveMovies}
        handleSetMovies={handleSetMovies}
        renderedMovies={renderedMovies}
        resultMessage={resultMessage}
        movies={movies}
        checkboxOn={checkboxOn}
        imageUrl={imageUrl} />
    </div>
  );
}

export default SavedMovies;