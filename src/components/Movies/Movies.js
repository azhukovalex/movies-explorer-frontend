import React from 'react';
import { useLocation } from 'react-router-dom';
import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import MoreBtn from '../MoreBtn/MoreBtn';
import Preloader from '../Preloader/Preloader';

function Movies(props) {
    const { userData, currentUser, isLoading, movies, handleSetMovies, handleDeleteMovies, handleSaveMovies, resultMessage, imageUrl, handleSearchShortMovies, searchShortMovies } = props;
    const [isMoreBtnVisible, setisMoreBtnVisible] = React.useState(false); // кнопка MoreBtn
    const [renderedMovies, setRenderedMovies] = React.useState([]);
    const [moviesRendering, setmoviesRendering] = React.useState(0); //добавка по MoreBtn
    const [moviesRenderingAdd, setmoviesRenderingAdd] = React.useState(0);
    const [checkboxOn, setcheckboxOn] = React.useState(false);

    const location = useLocation().pathname;
    const windowWidth = window.innerWidth;

    function moviesRender() { //отрисовка по ширине        
        if (windowWidth >= 1285) {
            setmoviesRendering(12);
            setmoviesRenderingAdd(6);
        } else if (windowWidth < 1283 && windowWidth > 1000) {
            setmoviesRendering(12);
            setmoviesRenderingAdd(3);
        } else if (windowWidth < 1279 && windowWidth > 768) {
            setmoviesRendering(8);
            setmoviesRenderingAdd(2);
        } else {
            setmoviesRendering(5);
            setmoviesRenderingAdd(2);
        }
    }

    React.useEffect(() => {
        moviesRender();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [windowWidth]);

    function handleMoreBtn() {
        setRenderedMovies(movies.slice(0, renderedMovies.length + moviesRenderingAdd));
        if (renderedMovies.length >= movies.length - moviesRenderingAdd) {
            setisMoreBtnVisible(false);
        }
    }

    React.useEffect(() => {
        if (location === '/movies') {
            setRenderedMovies(movies.slice(0, moviesRendering));
            if (movies.length <= moviesRendering) {
                setisMoreBtnVisible(false);
            } else {
                setisMoreBtnVisible(true);
            }
        } else {
            setRenderedMovies(movies);
            setisMoreBtnVisible(false);
        }
    }, [location, movies, moviesRendering]);



    // {isLoading && <Preloader />}
    return (
        <div className="movies">
            {isLoading && <Preloader />}
            <SearchForm
                handleSetMovies={handleSetMovies}
                handleSearchShortMovies={handleSearchShortMovies}
                setcheckboxOn={setcheckboxOn}
                checkboxOn={checkboxOn}
            />

            <MoviesCardList
                currentUser={currentUser}
                userData={userData}
                searchShortMovies={searchShortMovies}
                handleDeleteMovies={handleDeleteMovies}
                handleSearchShortMovies={handleSearchShortMovies}
                handleSaveMovies={handleSaveMovies}
                handleSetMovies={handleSetMovies}
                renderedMovies={renderedMovies}
                resultMessage={resultMessage}
                movies={movies}
                imageUrl={imageUrl}
                checkboxOn={checkboxOn}
            />

            <MoreBtn
                isMoreBtnVisible={isMoreBtnVisible}
                handleMoreBtn={handleMoreBtn}
            />
        </div>
    );
}

export default Movies;