/*const BASE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

export const getAllMovies = () => {
  return fetch(`${BASE_URL}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    });
}*/


class MoviesApi{
  constructor(optionsUrl){
      this._url = optionsUrl;
  }

  getAllMovies(){
      return fetch(`${this._url}`,{
          method: 'GET',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
      })
      .then((res) => {
          if(res.ok) {  return res.json(); }
          return Promise.reject(`Error happen ${res.status}`)
      })
  }
}

const moviesApi = new MoviesApi('https://api.nomoreparties.co/beatfilm-movies');

export default moviesApi;