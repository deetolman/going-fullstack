const fs = require('fs');
const pg = require('pg');
const Client = pg.Client;
const databaseUrl = 'postgres://localhost:5432/movies';

const client = new Client(databaseUrl);

client.connect();

client.query(`
SELECT name, year, genre FROM movie;
`)
  .then(results => {
    fs.writeFileSync(
      'movie.json',
      JSON.stringify(results.rows, true, 2)
    );
  })
  .catch(err => console.log(err)
  )
  .then(() => {
    client.end();
  });