import React from 'react';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import MoreBtn from '../MoreBtn/MoreBtn';


function Movies() {

    return (
        <div className="movies">
            <SearchForm />
            <MoviesCardList />
            <MoreBtn />
        </div>
    );
}

export default Movies;