class Api {
  constructor({ baseUrl, headers }) {
    this._url = baseUrl;
  }

  getUserInform(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => {
        console.log("getUserInform OK");
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      });
  }

  getMovies(token) {
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => {
        console.log("getMovies OK");
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      });
  }


  updateProfileInfo({ name, email }, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
    .then(res => {
      console.log("updateProfileInfo OK");
      if (res.status === 400) { throw new Error('При регистрации пользователя произошла ошибка.') }
      else if (res.status === 409) { throw new Error('Пользователь с таким email уже существует.') }
      else return res.json()
  })
  .then((res) => {
      return res;
  })
  .catch((err) => {
      console.log(err);
      return Promise.reject(err);
  });
  }
  createNewCard(data, token) {
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: +data.duration,
        year: +data.year,
        description: data.description,
        image: `https://api.nomoreparties.co${data.image.url}`,
        trailer: data.trailerLink,
        thumbnail: `https://api.nomoreparties.co${data.image.formats.thumbnail.url}`,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN
      })
    })
      .then(res => {
        console.log(`ответ: ${res}`);
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
  deleteCard(movieId, token) {
    console.log(movieId);
    console.log("токен:" + token);
    return fetch(`${this._url}/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
      });
  }


}

const MainApi = new Api({
 baseUrl: "https://azhukovalexback.vint1024.ru",
 //baseUrl: "http://localhost:3001",

});

export default MainApi;

