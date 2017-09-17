const pool = new require('pg').Pool({
  user: 'pantro',
  database: 'mdd',
  password: 't[41]mdieC',
  host: 'pg-mdd',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 3000
})

pool.on('error', (err, client) =>
  console.error('Erro em espera', err.message, err.stack)
)

class DB {
  static query(sql, callback) {
    pool.connect((err, client, done) => {
      if (err) {
        return console.error('error fetching client from pool', err)
      }
      client.query(sql, (err, rs) => {
        done()
        if (err) {
          return console.error('error running query', err)
        }
        if (typeof callback === 'function')
          callback(rs.rows)
        else
          return rs.rows
      })
    })
  }
  static get(table, args, callback) {
    typeof args === 'function' && ([args, callback] = [callback, args])
    typeof args === 'object' && (args = DB.buildWhere(args))
    DB.query(`SELECT * FROM ${table} ${(args ? args : 'ORDER BY 1')};`, callback)
  }
  static buildWhere(obj) {
    let where = 'WHERE '
    for (let prop in obj) {
      where += `${prop} = '${obj[prop]}' AND `
    }
    where = where.substr(0, where.length-5)
    return where
  }
  static destroy(table, id, callback) {
    DB.query(`DELETE FROM ${table} WHERE id = ${id} RETURNING *;`, callback)
  }
  static save(table, obj, callback) {
    DB.query(obj.id ? DB.buildUpd(table, obj) : DB.buildIns(table, obj), callback)
  }
  static buildUpd(table, obj) {
    let set = []
    for (let prop in obj) {
      set.push(`${prop} = '${obj[prop]}'`)
    }
    return `UPDATE ${table} SET ${set.toString()} `
          +`WHERE id=${obj.id} RETURNING *`
  }
  static buildIns(table, obj) {
    let values = [], fields = []
    for (let prop in obj) {
      if (obj[prop]) {
        values.push(`'${obj[prop]}'`)
        fields.push(prop)
      }
    }
    return `INSERT INTO ${table} (${fields.toString()}) `
          +`VALUES (${values.toString()}) RETURNING *;`
  }
}
module.exports = DB