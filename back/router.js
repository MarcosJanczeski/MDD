const DB = require('./db')
  , GET = (req, res, table, data) => {
    res.end(JSON.stringify({ method: req.method, json: data }))
  }
  , POST = (req, res, table, data) => {
    DB.save(table, data, (rs) => res.end(JSON.stringify(rs)))
  }
  , PUT = (req, res, table, data) => {
    DB.save(table, data, (rs) => res.end(JSON.stringify(rs)))
  }
  , DELETE = (req, res, table, data) => {
    res.end(JSON.stringify({ method: req.method, json: data }))
  }
module.exports = { GET, POST, PUT, DELETE }