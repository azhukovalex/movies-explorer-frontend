import React from 'react';
import './SearchForm.css';
import shortOn from '../../images/ShortOn.svg';
import shortOff from '../../images/ShortOff.svg';

function SearchForm(props) {
  const { handleSearch, searchKeyWord, moviesPreloader, isPreloader } = props;
  const [keyWord, setKeyWord] = React.useState(searchKeyWord || '');
  const [isShort, setIsShort] = React.useState(false);
  const [isShown, setIsShown] = React.useState(false);
  const [isShortOn, setIsShortOn] = React.useState(false);
  const shortBtn = `${isShortOn ? shortOn : shortOff}`;

  //значок удаления при hover
  function handleShortOn() {
    setIsShortOn(!isShortOn);
  }
  function handleShort() {
    setIsShort(!isShort)
  }

  function handleChange(event) {
    event.preventDefault();
    const value = event.target.value;
    setKeyWord(value.toLowerCase());
  }

  function handleSubmit(event) {
    event.preventDefault();
    !keyWord ? setIsShown(true) : handleSearch(keyWord, isShort);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate="novalidate">
      <label className="search-form__block">
        {isShown && !keyWord && <span className="search-form__span-error">Нужно ввести ключевое слово</span>}
        <input className="search-form__area"
          placeholder="Фильм"
          value={keyWord || ''}
          name="search"
          onChange={handleChange}
          autoComplete="off"
          required
          disabled={isPreloader || moviesPreloader}
        />

        <button className="search-form__btn" type="submit" ></button>
      </label>

      <label className="search-form__filter">
        <input className="search-form__checkbox"
          id="short"
          type="checkbox"
          onClick={handleShortOn}
          onChange={handleShort}
          disabled={isPreloader || moviesPreloader}
        />
        <span className="search-form__checkbox-span" style={{ backgroundImage: "url(" + shortBtn + ")" }}></span>
        Короткометражки
      </label>
    </form>
  );
}

export default SearchForm;