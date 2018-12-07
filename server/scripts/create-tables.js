const client = require('../db-client');

client.query(`
        CREATE TABLE IF NOT EXISTS actor (
            id SERIAL PRIMARY KEY,
            actor VARCHAR(256) NOT NULL,
            movie VARCHAR(256)                  
        );

        CREATE TABLE IF NOT EXISTS movie (
          id SERIAL PRIMARY KEY,
          name VARCHAR(256) NOT NULL,
          year INTEGER,
          genre VARCHAR(256)                  
      );
    `)
  .then(
    () => console.log('create tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });