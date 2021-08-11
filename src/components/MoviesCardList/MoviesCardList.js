import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoreBtn from '../MoreBtn/MoreBtn';
import {
  LARGE_DISPLAY_MOVIES,
  MIDDLE_DISPLAY_MOVIES,
  MOBILE_DISPLAY_MOVIES,
  ADD_EXTRA_LARGE_MOVIES,
  ADD_LARGE_MOVIES,
  ADD_MIDDLE_MOVIES,
  EXTRA_LARGE_DISPLAY,
  LARGE_DISPLAY_MAX,
  LARGE_DISPLAY_MIN,
  MIDDLE_DISPLAY_MAX,
  MIDDLE_DISPLAY_MIN,
} from "../../utils/configs";


function MoviesCardList(props) {
  const { removeMovieHandler, addMovieHandler, cardsData, handleDelMovie, imageUrl, isCSS } = props;
  const windowWidth = window.innerWidth;
  const [moviesRendering, setmoviesRendering] = React.useState(0); //добавка по MoreBtn //count
  const [moviesRenderingAdd, setmoviesRenderingAdd] = React.useState(0); //setCountAdd

  function moviesRender() { //отрисовка по ширине        
    if (windowWidth >= EXTRA_LARGE_DISPLAY) {
      setmoviesRendering(LARGE_DISPLAY_MOVIES);
      setmoviesRenderingAdd(ADD_EXTRA_LARGE_MOVIES);
    } else if (windowWidth < LARGE_DISPLAY_MAX && windowWidth > LARGE_DISPLAY_MIN) {
      setmoviesRendering(LARGE_DISPLAY_MOVIES);
      setmoviesRenderingAdd(ADD_LARGE_MOVIES);
    } else if (windowWidth < MIDDLE_DISPLAY_MAX && windowWidth > MIDDLE_DISPLAY_MIN) {
      setmoviesRendering(MIDDLE_DISPLAY_MOVIES);
      setmoviesRenderingAdd(ADD_MIDDLE_MOVIES);
    } else {
      setmoviesRendering(MOBILE_DISPLAY_MOVIES);
      setmoviesRenderingAdd(ADD_MIDDLE_MOVIES);
    }
  }

  React.useEffect(() => {
    moviesRender();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);

  return (
    <>

      <div className="movies__card-list" id="allMovies">
        {
          cardsData.slice(0, moviesRendering).map((item) => {
            return (
              <MoviesCard
                isCSS={isCSS}
                key={item.id || item.movieId}
                data={item}
                image={!!imageUrl ? imageUrl.concat(item.image.url) : item.image}
                addMovieHandler={addMovieHandler}
                removeMovieHandler={removeMovieHandler}
                handleDelMovie={handleDelMovie}
              />
            )
          })
        }
      </div>
      {cardsData.length > moviesRendering &&
        <MoreBtn
          setmoviesRendering={setmoviesRendering}
          moviesRendering={moviesRendering}
          moviesRenderingAdd={moviesRenderingAdd}
        />}

    </>
  );
}

export default MoviesCardList;

