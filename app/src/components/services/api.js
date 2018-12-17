export default {
  getMovies() {
    return fetch('/api/movies')
      .then(response => response.json());
  },
  getMovie(id) {
    return fetch(`/api/movies/${id}`)
      .then(response => response.json());
  },
  addMovie(movie) {
    return fetch('/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
      .then(response => response.json());
  },
  deleteMovie(id) {
    return fetch(`/api/movies/${id}`, {
      method: 'DELETE'
    })
      .then(response => response.json());
  },
  updateMovie(movie, id) {
    return fetch(`api/movies/${id}`, {
      method: 'UPDATE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
      .then(response => response.json());
  },

};
