const client = require('../db-client');

client.query(`
        DROP TABLE IF EXISTS movie;
        DROP TABLE IF EXISTS actor;
        `)
  .then(
    () => console.log('drop tables complete'),
    err => console.log(err)
  )
  .then(() => {
    client.end();
  });