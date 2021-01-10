const connection = require('./dbConnector')
const sqlQuery = require('./sqlQuery')
const dbQueryManager = require('./dbQueryManager')

const API_METHOD = Object.freeze({
  GET: 'GET',
  POST: 'POST',
  PUT: 'POST',
  DELETE: 'DELETE'
})

exports.registerRoutes = async function(app) {

  app.post('/user', async (req, res) => {
    const conn = await connection().catch(e => {})
    const body = req.body;
    console.log("body is: ", req.body);
    const results = await dbQueryManager(conn, sqlQuery.createUser(body)).then(result => {
      console.log("Query success! Result is: ", result)
    }).catch(console.log);
    res.send({ results });
  })

  app.post('/user/location', async (req, res) => {
    const conn = await connection().catch(e => {})
    const body = req.body;
    const results = await dbQueryManager(conn, sqlQuery.registerBeenToLocation(body)).catch(console.log);
    res.send({ results });
  })

  app.post('/user/has-covid', async (req, res) => {
    const conn = await connection().catch(e => {})
    const body = req.body;
    const results = await dbQueryManager(conn, sqlQuery.registerCovid(body.id, body['has_covid'])).then(result => {
      console.log("Query success! Result is: ", result)
    }).catch(console.log);
    res.send({ results });
  })

  app.post('/covid-count', async (req, res) => {
    const conn = await connection().catch(e => {})
    const body = req.body;
    const results = await dbQueryManager(conn, sqlQuery.getCovidCount(body)).then(result => {
      console.log("Query success! Result is: ", result)
    }).catch(console.log);
    res.send({ results });
  })
}

runQueryFromRoute = function(_route, _method, _query) {
  switch(_method) {
    case API_METHOD.GET:
      app.get(route, async (req, res) => {
        const conn = await connection(dbConfig).catch(e => {}) 
        const results = await query(conn, _query).catch(console.log);
        res.send({ results });
      })
      break;
      case API_METHOD.POST:
        app.post(route, async (req, res) => {
          var body = req.body;
          const conn = await connection(dbConfig).catch(e => {}) 
          const results = await query(conn, _query).catch(console.log);
          res.send({ results });
        })
        break;
        case API_METHOD.PUT:
          app.put(route, async (req, res) => {
            const conn = await connection(dbConfig).catch(e => {}) 
            const results = await query(conn, _query).catch(console.log);
            res.send({ results });
          })
          break;
          case API_METHOD.DELETE:
            app.delete(route, async (req, res) => {
              const conn = await connection(dbConfig).catch(e => {}) 
              const results = await query(conn, _query).catch(console.log);
              res.send({ results });
            })
            break;
  }
}

