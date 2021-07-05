import React from 'react';
import './SearchForm.css';
import shortOn from '../../images/ShortOn.svg';
import shortOff from '../../images/ShortOff.svg';


function SearchForm() {

  const [isClicked, setIsClick] = React.useState(false);
  const shortBtn = `${ isClicked ? shortOn : shortOff}`;

  function handleClick() {
    setIsClick(!isClicked);
  }

  return (
    <form className="search-form">
      <label className="search-form__block">
        <input className="search-form__area" placeholder="Фильм"></input>
        <button className="search-form__btn"></button>
      </label>
      <label className="search-form__filter">
        <input className="search-form__checkbox " type="checkbox" onClick={handleClick}></input>
        <span className="search-form__checkbox-span" style={{ backgroundImage: "url(" + shortBtn + ")" }}></span>
        Короткометражки
      </label>
    </form>
  );
}

export default SearchForm;