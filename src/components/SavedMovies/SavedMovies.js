import React from 'react';
import './SavedMovies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import MoreBtn from '../MoreBtn/MoreBtn';

function SavedMovies() {

    return (
        <div className="movies__main-saved">
            <SearchForm />
            <MoviesCardList />
            <MoreBtn />
        </div>
    );
}

export default SavedMovies;