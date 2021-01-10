const dbConnector = require('./dbConnector')
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
    await processQuery(req, res, sqlQuery.createUser);
  })

  app.post('/user/login', async (req, res) => {
    await processQuery(req, res, sqlQuery.loginUser);
  })

  app.post('/user/location', async (req, res) => {
    await processQuery(req, res, sqlQuery.registerBeenToLocation);
  })

  app.post('/user/has-covid', async (req, res) => {
    await processQuery(req, res, sqlQuery.registerCovid);
  })

  app.post('/covid-count', async (req, res) => {
    await processQuery(req, res, sqlQuery.getCovidCount);
  })
}

const processQuery = async (req, res, queryFunc) => {
  const connection = await dbConnector().catch(e => {})
  const body = req.body;
  console.log('body: ', body)
  const results = await dbQueryManager(connection, queryFunc(body)).then(result => {
    console.log("Query success! Result is: ", result);
    return { 
      status: "success",
      code: 200,
      result: !!result.length > 0 && result[0][0] ? result[0][0] : result[0] ? result[0] : {}
    };
  }).catch(error => {
    console.log("Query failed! Error is: ", error);
    return {
      status: "error",
      code: 400,
      details: error
    };
  });
  res.send(results);
  await connection.end();
}

