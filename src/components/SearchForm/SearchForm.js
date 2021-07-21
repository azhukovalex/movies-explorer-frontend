import React from 'react';
import './SearchForm.css';
import shortOn from '../../images/ShortOn.svg';
import shortOff from '../../images/ShortOff.svg';
import { useLocation } from 'react-router-dom';

function SearchForm(props) {
  const { isLoading, checkboxOn, setcheckboxOn, handleSetMovies, handleSearchShortMovies, setSearchSubmit } = props;
  const location = useLocation().pathname;
  const [isErrShown, setisErrShown] = React.useState(false);
  const [key, setKey] = React.useState('');
  const shortBtn = `${checkboxOn ? shortOn : shortOff}`;

  function handleSetKey(evt) {
    setKey(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    !key ? setisErrShown(true) : saveKeyAndSearch();
    location === '/saved-movies' && setSearchSubmit(true);
  }

  function saveKeyAndSearch() {
    localStorage.setItem('keyword', key);
    handleSetMovies();
  }

  function handleSetCheck() {
    const checkbox = document.getElementById("short")
    if (checkbox.checked) {
      localStorage.setItem('check', 'on');
      handleSearchShortMovies();
      setcheckboxOn(true);
    }
    else {
      localStorage.removeItem('check');
      saveKeyAndSearch();
      setcheckboxOn(false);
    }
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate="novalidate">
      <label className="search-form__block">
        {isErrShown && !key && <span className="search-form__span-error">Нужно ввести ключевое слово</span>}
        <input className="search-form__area" placeholder="Фильм" value={key || ''} name="search" onChange={handleSetKey} disabled={isLoading} autoComplete="off" required ></input>
        <button className="search-form__btn" type="submit" disabled={isLoading}></button>
      </label>

      <label className="search-form__filter">
        <input className="search-form__checkbox" id="short" type="checkbox" onClick={handleSetCheck}></input>
        <span className="search-form__checkbox-span" style={{ backgroundImage: "url(" + shortBtn + ")" }}></span>
        Короткометражки
      </label>
    </form>
  );
}

export default SearchForm;