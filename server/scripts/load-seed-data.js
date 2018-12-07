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
            INSERT INTO movie (name, actor_id, genre, year)
            SELECT 
            $1 as name, 
            id as actor_id,
            $2 as genre,
            $3 as year
          FROM actor
          WHERE movie = $4;
            `,
        [movie.name, movie.genre, movie.year, movie.name]);
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