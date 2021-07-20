import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFoundError from '../NotFoundError/NotFoundError';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import * as auth from "../../utils/auth";
import * as apiAllMovies from '../../utils/MoviesApi';
import apiMain from '../../utils/MainApi';
import InfoTooltip from '../Tooltip/Tooltip';


function App() {
  const [movies, setMovies] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setIsLoggedIn] = React.useState(false);
  const [resultMessage, setResultMessage] = React.useState('');
  const history = useHistory();
  const imageUrl = 'https://api.nomoreparties.co';
  const [token, setToken] = React.useState(''); // установка токена
  const [userData, setUserData] = React.useState({});
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [successToolTip, setSuccessToolTip] = React.useState(false);
  const [isTooltipProfile, setIsTooltipProfile] = React.useState(false);
  const [isTooltipLogin, setIsTooltipLogin] = React.useState(false);


  //******************************   РЕГИСТРАЦИЯ И ВХОД    ************************************************************** */
  React.useEffect(() => {
    tokenChecking();
    getUserContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]);
  //закрыть попап
  function closeAllPopups() {
    setIsTooltipOpen(false);
    setSuccessToolTip(false);
  }
  //эскейп
  function handleEscClose(e) {
    if (e.key === 'Escape') {
      closeAllPopups();
    }
  }
  //оверлэй
  function handlerOverlayClick(e) {
    if (e.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }
  //слушатели для попапа
  React.useEffect(() => {
    window.addEventListener('keydown', handleEscClose);
    window.addEventListener('mousedown', handlerOverlayClick);
    return () => {
      window.removeEventListener('mousedown', handlerOverlayClick);
      window.removeEventListener('keydown', handleEscClose);
    };
  })
  //вход
  function handleLoggedIn({ email, password }) {
    return auth
      .authorize(email, password)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          setToken(res.token);
          setIsLoggedIn(true);
          history.push("/movies");
        } else {
          setIsTooltipLogin(true);
          setIsTooltipOpen(true);
          throw new Error('Не удалось войти в аккаунт')
        }
      })
      .catch((err) => {
        setIsTooltipLogin(true);
        setIsTooltipOpen(true);
        console.log(err);
      })
  }

  // рега
  function handleRegister(values) {
    return auth.register(values)
      .then((res) => {
        if (res) {
          setSuccessToolTip(true);
          setIsTooltipOpen(true);
          history.push('/signin');
        }
      })
      .catch((err) => {
        setSuccessToolTip(false);
        setIsTooltipOpen(true);
        console.log(err);
      })
  }

  // выход
  function handleLogOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push('/');
  }


  // проверка токена
  function tokenChecking() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setToken(jwt)
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setUserData({
              id: res._id,
              name: res.name,
            });
            setIsLoggedIn(true);
            history.push('/')
          } else {
            localStorage.removeItem("jwt");

          }
        });
    }
  }
  // запрос информации о пользователе и фильмах
  function getUserContent() {
    if (loggedIn) {
      setIsLoading(true);
      Promise.all([apiMain.getUserInform(token), apiMain.getAllMovies(token)])
        .then((res) => {
          const [user, moviesList] = res;
          setCurrentUser(user);

          localStorage.setItem('saved-movies', JSON.stringify(moviesList));
          if (localStorage.getItem('movies') === null) {
            localStorage.setItem('movies', JSON.stringify(moviesList));
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsLoading(false))
    }
  }

  // обновление пользователя
  function handleUpdateUser({ name, email }) {
    apiMain.updateProfileInfo({ name, email }, token)
      .then((userData) => {
        setCurrentUser({
          name: userData.name,
          email: userData.email
        });
        setIsTooltipProfile(true);
        setTimeout(setIsTooltipOpen(true), 100);
        setSuccessToolTip(true);

      })
      .catch((err) => {
      })
  }

  //**************************************************   ФИЛЬМЫ  ******************************************************* */


  //получение фильмов и сохр. в localStor
  function getMovies() {
    setIsLoading(true)
    apiAllMovies.getAllMovies()
      .then((movies) => {
        localStorage.setItem('movies', JSON.stringify(movies));
      })
      .catch(() => {
        localStorage.removeItem('movies');
      })
      .finally(() => setIsLoading(false))
  }

  // создание массива по ключ. слову
  function handleSetMovies() {
    if (localStorage.getItem('keyword') === null) {
      localStorage.setItem('keyword', '');
    }
    if (localStorage.getItem('keyword').length > 0) {
      getMovies();
      const moviesData = searchMovies(localStorage.getItem('keyword'));
      setMovies(moviesData);
      const shortMovies = searchShortMovies(moviesData);
      if (shortMovies) {
        setMovies(shortMovies);
        if (shortMovies.length === 0) {
          setResultMessage('Ничего не найдено')
        }
      }
    }
    else {
      setMovies([]);
      if (movies === undefined) {
        setResultMessage("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз");
      }
    }
    localStorage.removeItem('keyword');
  }

  //фильтр короткого метра кнопкой
  function searchShortMovies(massive) {
    if (massive) {
      if (localStorage.getItem('check') === "on" && massive.length > 0) {
        const shortDuration = 40;
        const findMoviesShort = massive.filter(item => item.duration <= shortDuration);
        return (findMoviesShort);
      }
      if (massive.length === 0) {
        return massive;
      }
    }
  }

  // срабатывает чекбокс по короткометражкам и отрисовка полученного массива
  function handleSearchShortMovies() {
    handleSetMovies();
    if (movies !== []) {
      const shortMovies = searchShortMovies(movies);
      if (shortMovies) {
        setMovies(shortMovies);
      }
    }
  }

  // фильтрация фильмов 
  function searchMovies(key) {
    function choosePageMassive() {
      return document.getElementById("allMovies") ? JSON.parse(localStorage.getItem('movies')) : JSON.parse(localStorage.getItem('saved-movies')); //если поиск на /movies
    }
    const movies = choosePageMassive();
    if (movies) {
      const findMovies = movies.filter(item => item.nameRU.toLowerCase().includes(key.toLowerCase())); //поиск в названии по ключу
      return findMovies;
    }
  }

  // сохранить фильм по модели
  function handleSaveMovies(movieCard) {
    console.log(token);
    apiMain.createNewCard({
      country: movieCard.country || ' ',
      director: movieCard.director || ' ',
      duration: movieCard.duration.toString(),
      year: movieCard.year || ' ',
      description: movieCard.description || ' ',
      image: `${imageUrl}${movieCard.image.url}` || ' ',
      trailer: movieCard.trailerLink || ' ',
      nameRU: movieCard.nameRU,
      nameEN: movieCard.nameEN || ' ',
      thumbnail: `${imageUrl}${movieCard.image.formats.thumbnail.url}` || ' ',
      movieId: movieCard.id,
    }, token)
      .then((movieData) => {
        apiMain.getAllMovies(token)
          .then((moviesList) => {
            localStorage.setItem('saved-movies', JSON.stringify(moviesList))
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // удалить фильм
  function handleDeleteMovies(movieCard) {
    apiMain.deleteCard(movieCard._id, token)
      .then(() => {
        apiMain.getAllMovies(token)
          .then((moviesList) => {
            localStorage.setItem('saved-movies', JSON.stringify(moviesList))
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <Header userData={userData}
          loggedIn={loggedIn} />

        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <ProtectedRoute
            exact path="/movies"
            currentUser={currentUser}
            userData={userData}
            loggedIn={loggedIn}
            component={Movies}
            searchShortMovies={searchShortMovies}
            handleSaveMovies={handleSaveMovies}
            resultMessage={resultMessage}
            movies={movies}
            handleSetMovies={handleSetMovies}
            handleSearchShortMovies={handleSearchShortMovies}
            handleDeleteMovies={handleDeleteMovies}
            isLoading={isLoading}
            imageUrl={imageUrl} />


          <ProtectedRoute
            exact path="/saved-movies"
            userData={userData}
            currentUser={currentUser}
            loggedIn={loggedIn}
            component={SavedMovies}
            movies={movies}
            handleSetMovies={handleSetMovies}
            resultMessage={resultMessage}
            isLoading={isLoading}
            handleSearchShortMovies={handleSearchShortMovies}
            handleDeleteMovies={handleDeleteMovies}
            searchShortMovies={searchShortMovies}
            apiMain={apiMain.getAllMovies}
            getUserContent={getUserContent}
          />

          <ProtectedRoute
            loggedIn={loggedIn}
            path="/profile"
            component={Profile}
            handleLogOut={handleLogOut}
            onUpdateUser={handleUpdateUser}
            userData={userData} />

          <Route path="/signup">
            <Register
              loggedIn={loggedIn}
              setIsLoggedIn={setIsLoggedIn}
              onRegister={handleRegister} />
          </Route>

          <Route path="/signin">
            <Login
              setIsLoggedIn={setIsLoggedIn}
              onLogin={handleLoggedIn} />
          </Route>

          <Route path="*">
            <NotFoundError />
          </Route>

          <Route exact path='/profile'>
            {loggedIn
              ? <Redirect to='/profile' />
              : <Redirect to='/' />
            }
          </Route>

        </Switch>
        <Footer />
        <InfoTooltip
          isTooltipOpen={isTooltipOpen}
          onClose={closeAllPopups}
          successToolTip={successToolTip}
          isTooltipProfile={isTooltipProfile}
          isTooltipLogin={isTooltipLogin}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
