const express = require('express');
const app = express();
const morgan = require('morgan');
const client = require('./db-client');

app.use(morgan('dev'));

app.use(express.json());

app.get('/api/actors', (req, res) => {
  client.query(`
  SELECT id, actor, movie
  FROM actor
  ORDER BY movie ASC
  `)
    .then(result => {
      res.json(result.rows);
    });
});

app.get('/api/movies', (req, res) => {
  client.query(`
    SELECT 
      movie.id, 
      movie.name,
      movie.year,
      movie.genre
    FROM movie
    JOIN actor
    ON movie.actor_id = actor.id
  `)
    .then(result => {
      res.json(result.rows);
    });
});


app.get('/api/movies/:id', (req, res) => {
  client.query(`
  SELECT * FROM movie WHERE id = $1;
  `,
  [req.params.id])
    .then(result => {
      res.json(result.rows[0]);
    });
});

app.post('/api/movies', (req, res) => {
  const body = req.body;

  client.query(`
  INSERT INTO movie (name, actor_id, genre)
  VALUES($1, $2, $3)
  RETURNING id;
  `,
  [body.name, body.actorId, body.genre])
    .then(result => {
      const id = result.rows[0].id;

      return client.query(`
        SELECT 
          movie.id,
          movie.name,
          movie.actor_id,
          movie.year,
          movie.genre
        FROM movie
        JOIN name
        ON movie.actor_id = actor.id
        WHERE movie.id = $1;
      `,
      [id]);
    })
    .then(result => {
      res.json(result.rows[0]);
    });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('server app started on port', PORT);

});


