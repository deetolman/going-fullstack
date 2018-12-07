const client = require('../db-client');
const movies = require('./movies.json');
const actors = require('./actors');

Promise.all(
  actors.map(actor => {
    return client.query(`
        INSERT INTO actor (actor, movie)
        VALUES ($1, $2);
        `,
    [actor.actor, actor.movie]);    
  })
)
  .then(() => {
    return Promise.all(
      movies.map(movie => {
        return client.query(`
            INSERT INTO movie (name, year, genre)
            SELECT 
            $1 as name, 
            id as year,
            $2 as genre
          FROM actor
          WHERE movie = $3;
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