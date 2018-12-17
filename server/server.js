const express = require('express');
const app = express();
const morgan = require('morgan');
const movies = require('./libs/movies');
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

app.use(movies);

app.delete('/api/movies/:id', (req, res) => {
  client.query(`
  DELETE FROM movie WHERE id =$1;
  `,
  [req.params.id])
    .then(result => {
      res.json({ removed: result.rowCount === 1 });
    });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log('server app started on port', PORT);

});


