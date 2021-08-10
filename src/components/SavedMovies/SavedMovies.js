import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function SavedMovies(props) {
  const { isPreloader, handleSearch, removeMovieHandler, searchKeyWord,  } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const [cardList, setCardsList] = React.useState([]);
  const [savedMovieEerorMessage, setSavedMovieEerorMessage] = React.useState('');
  const [SavedMovieIsError, setSavedMovieIsError] = React.useState(false);

  function handleSubmit(keyWord, isShort) {
    const found = handleSearch(currentUser.savedMoviesArray, keyWord, isShort);
    setCardsList(found);
    if (found < 1) {
      setSavedMovieIsError(true);
      setSavedMovieEerorMessage('Ничего не найдено');
    }
  }

  function handleDelMovie(data) {
    removeMovieHandler(data);
    setCardsList(currentUser.savedMoviesArray.filter((item) => item.movieId !== data.movieId));
  }
  React.useEffect(() => {
    if (currentUser) {setCardsList(currentUser.savedMoviesArray)}    
    }
  , [currentUser]) 


  return (
    <div className="movies__main-saved">
      <SearchForm
        handleSearch={handleSubmit}
        searchKeyWord={searchKeyWord}
        isPreloader={isPreloader}
      />
      {isPreloader ? <Preloader />
        :
        SavedMovieIsError ? <p className="card-list__text">{savedMovieEerorMessage}</p>
          :
          <MoviesCardList
            cardsData={cardList}
            removeMovieHandler={handleDelMovie}
            
          />}
    </div>
  );
}

export default SavedMovies;


