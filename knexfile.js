
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/loganon.db3'
    },
    useNullAsDefault: true,
    debug: true
  },
    migrations: {
      directory: './data/migrations',
  },
    seeds: {
      directory: './data/seeds'
    },
    testing: {
      client: 'sqlite3',
        connection: {
        filename: './data/loganontests.db3'
      },
      seeds: {
        directory: './data/seeds'
      },
    },
  };
