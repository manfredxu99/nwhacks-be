const Express = require("express");

const app = new Express();

app.get("/", (req, res) => {
  res.send("dickhead");
});

app.listen(8080);
