import React from 'react';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import MoreBtn from '../MoreBtn/MoreBtn';


function MoviesCardList(props) {
  const { removeMovieHandler, addMovieHandler, cardsData, handleDelMovie, imageUrl, isCSS } = props;
  const windowWidth = window.innerWidth;
  const [moviesRendering, setmoviesRendering] = React.useState(0); //добавка по MoreBtn //count
  const [moviesRenderingAdd, setmoviesRenderingAdd] = React.useState(0); //setCountAdd

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

