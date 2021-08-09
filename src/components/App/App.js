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
import MainApi from '../../utils/MainApi';
import InfoTooltip from '../Tooltip/Tooltip';

function App() {
  const history = useHistory();
  const imageUrl = 'https://api.nomoreparties.co';
  const [token, setToken] = React.useState(''); // установка токена
  const [isTooltipOpen, setIsTooltipOpen] = React.useState(false);
  const [successToolTip, setSuccessToolTip] = React.useState(false);
  const [isTooltipProfile, setIsTooltipProfile] = React.useState(false);
  const [isTooltipLogin, setIsTooltipLogin] = React.useState(false);
  const [isPreloader, setIsPreloader] = React.useState(false);
  const [searchKeyWord, setSearchKeyWord] = React.useState('');
  const [currentUser, setCurrentUser] = React.useState({
    LoggedIn: true,
    name: '',
    email: '',
    _id: '',
    savedMoviesArray: [],
  });

  //******************************   РЕГИСТРАЦИЯ И ВХОД    ************************************************************** */

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
  function handleLoggedIn(values) {
    setIsPreloader(true);
    return auth
      .authorize(values)
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          setToken(res.token);
          setCurrentUser({
            ...currentUser,
            LoggedIn: true,
          });
          console.log(currentUser);
          handleTokenCheck();
          history.push("/movies"); // не работает
          //  window.location.href = '/movies' // 
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
      .finally(() => {
        setIsPreloader(false);
      });
  }


  // рега
  function handleRegister(values) {
    setIsPreloader(true);
    return auth.register(values)
      .then((res) => {
        if (res) {
          setSuccessToolTip(true);
          setIsTooltipOpen(true);
           setTimeout(handleLoggedIn(values), 100);
          history.push('/movies')
        }
      })
      .catch((err) => {
        setSuccessToolTip(false);
        setIsTooltipOpen(true);
        console.log(err);
      })
      .finally(() => {
        setIsPreloader(false);
      });
  }

  // выход
  function handleLogOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem('searchKeyWord');
    localStorage.removeItem('movies');
    setCurrentUser({
      LoggedIn: false,
      name: '',
      email: '',
      id: '',
      savedMoviesArray: [],
    });
    //history.push("/");  
    history.go("/");

  }

  // обновление пользователя
  function handleUpdateUser({ name, email }) {
    setIsPreloader(true);
    MainApi.updateProfileInfo({ name, email }, token)
      .then((userData) => {
        setCurrentUser({
          ...currentUser,
          name: userData.name,
          email: userData.email
        });
        setIsTooltipProfile(true);
        setTimeout(setIsTooltipOpen(true), 100);
        setSuccessToolTip(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsPreloader(false);
      });
  }

  //**************************************************   ФИЛЬМЫ  ******************************************************* */

  //handle search movies form
  function handleSearch(cards, keyWord, isShort) {
    localStorage.setItem('searchKeyWord', keyWord);
    setSearchKeyWord(keyWord);
    const arrayCards = [];
    isShort ? cards.forEach((item) => {
      item.nameRU.toLowerCase().includes(keyWord)
        && item.duration < 40
        && arrayCards.push(item);
    }) :
      cards.forEach((item) => {
        item.nameRU.toLowerCase().includes(keyWord) && arrayCards.push(item);
      })
    return arrayCards;
  }

  //лайк
  function addMovieHandler(data) {
    const token = localStorage.getItem('jwt');
    (currentUser.savedMoviesArray.findIndex(item => item.movieId === data.movieId) === -1) &&
      MainApi.createNewCard(data, token)
        .then((res) => {
          currentUser.savedMoviesArray.push(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
        });
  }

  //дизлайк
  function removeMovieHandler(data) {
    console.log("в removeMovieHandler :" + data.id);
    const id = data._id
      || currentUser.savedMoviesArray.find(item => item.movieId === data.id)._id;
    const token = localStorage.getItem('jwt');
    MainApi.deleteCard(id, token)
      .then((res) => {
        currentUser.savedMoviesArray = currentUser.savedMoviesArray.filter((item) => item.movieId !== res.movieId);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
      });
  }

  ///////////////////////////////    ПОЛУЧЕНИЕ И ПРОВЕРКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ    ///////////////////////////////////

  //получение данных
  const getUserData = React.useCallback((tokenParam) => {
    setIsPreloader(true);
    Promise.all([MainApi.getUserInform(tokenParam), MainApi.getMovies(tokenParam)])
      .then(([userData, savedMovies]) => {
        if (!!userData && !!savedMovies) {
          setCurrentUser({
            LoggedIn: true,
            name: userData.name,
            email: userData.email,
            id: userData.id,
            savedMoviesArray: savedMovies.filter((item) => item.owner === currentUser.id),
          });
          setSearchKeyWord(localStorage.getItem('searchKeyWord'));
        }
      })
      .catch((err) => {
        setCurrentUser({
          LoggedIn: false,
          name: '',
          email: '',
          savedMoviesArray: [],
        })
        console.log(err);
      })
      .finally(() => {
        setIsPreloader(false);
      });
  }, [currentUser.id])

//проверка
  const handleTokenCheck = React.useCallback(() => {
    const token = localStorage.getItem('jwt');
    setToken(token);
    if (token) {
      getUserData(token);
    } else {
      setCurrentUser({
        LoggedIn: false,
        name: '',
        email: '',
        savedMoviesArray: [],
      });
    }
  }, [getUserData])


//
  React.useEffect(() => {
    handleTokenCheck();
    setSearchKeyWord(localStorage.getItem('searchKeyWord'));
  }, [handleTokenCheck]);

  return (
    <div className='App'>
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          LoggedIn={currentUser.LoggedIn}
        />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>

          <ProtectedRoute exact path="/movies"
            component={Movies}
            currentUser={currentUser}
            searchKeyWord={searchKeyWord}
            handleSearch={handleSearch}
            removeMovieHandler={removeMovieHandler}
            addMovieHandler={addMovieHandler}
            LoggedIn={currentUser.LoggedIn}
            imageUrl={imageUrl}
          />

          <ProtectedRoute exact path="/saved-movies"
            component={SavedMovies}
            isPreloader={isPreloader}
            currentUser={currentUser}
            imageUrl={imageUrl}
            searchKeyWord={searchKeyWord}
            handleSearch={handleSearch}
            removeMovieHandler={removeMovieHandler}
            MainApi={MainApi.getAllMovies}
            LoggedIn={currentUser.LoggedIn}
            setCurrentUser={setCurrentUser}
          />

          <ProtectedRoute exact path="/profile"
            component={Profile}
            handleLogOut={handleLogOut}
            onUpdateUser={handleUpdateUser}
            LoggedIn={currentUser.LoggedIn}
            currentUser={currentUser}
            isPreloader={isPreloader}
          />

          <Route exact path="/signup">
            <Register
              isPreloader={isPreloader}
              onRegister={handleRegister}
              LoggedIn={currentUser.LoggedIn}
              {...currentUser.LoggedIn ? <Redirect to="/" /> : <Redirect to="/signup" />}
            />
          </Route>

          <Route exact path="/signin">
            <Login
              LoggedIn={currentUser.LoggedIn}
              isPreloader={isPreloader}
              onLogin={handleLoggedIn} />
            {currentUser.LoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>

          <Route path="*">
            <NotFoundError />
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

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;