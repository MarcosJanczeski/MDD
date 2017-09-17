const pg = require('pg')
  , config = {
    user: 'postgres',
    database: 'meudin',
    password: '',
    host: 'localhost',
    port: 5433,
    max: 10,
    idleTimeoutMillis: 3000
  }
  , pool = new pg.Pool(config)

pool.on('error', (err, client) =>
  console.error('Erro em espera', err.message, err.stack)
)

module.exports.query = (sql, values, callback) => pool.query(sql, values, callback)
module.exports.connect = callback => pool.connect(callback)
