const url = require('url')
, DB = require('../DB')
, server = require('http').createServer((req, res) => {
  const table = req.url.split('?')[0].split('/')[1]
  res.setHeader('Access-Control-Allow-Origin', '*')
  //res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method == 'OPTIONS') {
    res.end()
  } else {
    let data = ''
    req.on('data', (chunk) => {
      data += chunk
    }).on('end', () => {
      data !== '' && (data = JSON.parse(data))
      try {
        //require('./routes/' + table)[req.method](req, res, table, data)
      } catch (err) {
        console.log(`server.js-> erro ao tentar carregar ./routes/${table}`)
        console.error(err)
        res.end(JSON.stringify({ err: err.message }))
      }
    })
  }
}).listen(3000, () => console.log('Server purejs active on port 3000...'))