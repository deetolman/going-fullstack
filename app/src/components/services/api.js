export default {
  getMovies() {
    return fetch('/scripts/movies')
      .then(response => response.json());
  },
  getMovie(id) {
    return fetch(`/scripts/movies/${id}`)
      .then(response => response.json());
  },
  addMovie(movie) {
    return fetch('/scripts/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(movie)
    })
      .then(response => response.json());
  },
};