const DbRouter = require('./dbRouter')
const DbObjParser = require('./dbObjParser')

const express = require('express')
const { Router } = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Backend Server is running!'))

app.listen(port, () => console.log(`Backend Server listening on port ${port}!`))

DbObjParser(app);
DbRouter.registerRoutes(app);