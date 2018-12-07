const express = require('express');
const app = express();
const morgan = require('morgan');
const client = require('./db-client');

app.use(morgan('dev'));

app.use(express.json());

app.get('/api/movies', (req, res) => {
  client.query(`
    SELECT id, name, year, genre
    FROM movie;
  `)
    .then(result => {
      res.json(result.rows);
    });
});

app.get('/api/actors', (req, res))=> {
  client.query(`
  SELECT 
    actor.id,
    actor.actor,
    actor.movie
  FROM actor
  JOIN movie
  ON actor.actor_id = actor.id
  ORDER BY movie ASC
  `)
  .then(result => {
    res.json(result.rows);
  });
}

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
  INSERT INTO movie (name, year, genre)
  VALUES($1, $2, $3)
  RETURNING id, name, year, genre;
  `,
  [body.name, body.year, body.genre])
    .then(result => {
      res.json(result.rows[0]);
    });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('server app started on port', PORT);

});


