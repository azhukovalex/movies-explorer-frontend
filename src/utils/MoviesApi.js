class MoviesApi {
  constructor(optionsUrl) {
    this._url = optionsUrl;
  }

  getAllMovies() {
    return fetch(`${this._url}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) { return res.json(); }
        return Promise.reject(`${res.status}`)
      })
  }
}

const moviesApi = new MoviesApi('https://api.nomoreparties.co/beatfilm-movies');

export default moviesApi;