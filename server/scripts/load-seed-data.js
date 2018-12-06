const pg = require('pg');
const Client = pg.Client;
const databaseUrl = 'postgres://localhost:5432/movies';
const movies = require('./movies.json');

console.log(movies);
const client = new Client(databaseUrl);

client.connect()
  .then(() => {
    return Promise.all(
      movies.map(movie => {
        return client.query(`
            INSERT INTO movie (name, year, genre)
            VALUES ($1, $2, $3);
            `,
        [movie.name, movie.year, movie.genre]);
      })
    );
  })
  .then(
    () => console.log('seed data load complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });