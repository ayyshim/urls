const express = require("express");
const exhbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();

const config = require("./config");
const router = require("./routes");

app.engine("handlebars", exhbs());
app.set("view engine", "handlebars");

app.use(express.static("static"));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use("/", router);

const db = require("./database");

db.connect(app.listen(config.port, console.log("Server is up and running")));
