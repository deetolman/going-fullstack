const express = require('express');
const client = require('../db-client.js');
const Router = express.Router;
const router = Router(); //eslint-disable-line new-cap


router
  .get('/api/movies', (req, res) => {
    client.query(`
      SELECT 
        movie.id, 
        movie.name as name,
        movie.year as year,
        movie.genre as genre,
        actor.id as "actorId",
        actor.actor as actor
      FROM movie
      JOIN actor
      ON movie.actor_id = actor.id
    `)
      .then(result => {
        res.json(result.rows);
      });
  })
  
  .get('/api/movies/:id', (req, res) => {
    client.query(`
    SELECT * FROM movie WHERE id = $1;
    `,
    [req.params.id])
      .then(result => {
        res.json(result.rows[0]);
      });
  })
  
  .post('/api/movies', (req, res) => {
    const body = req.body;
  
    client.query(`
    INSERT INTO movie (name, actor_id, year, genre)
    VALUES($1, $2, $3, $4)
    RETURNING id;
    `,
    [body.name, body.actorId, body.year, body.genre])
      .then(result => {
        const id = result.rows[0].id;
      });
    })

    .put('/:id', (req,res) => {
      const body = req.body
    }
  
        return client.query(`
          SELECT 
            movie.id,
            movie.name as name,
            movie.actor_id,
            movie.year as year
            actor.id as "actorId",
            actor.actor as actor
          FROM movie
          JOIN actor
          ON movie.actor_id = actor.id
          WHERE movie.id = $1;
        `,
        [id]);
      })
      .then(result => {
        res.json(result.rows[0]);
      });
  });

module.exports = router;
  