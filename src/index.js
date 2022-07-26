require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const api = require("./api");

app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", api);
console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS);
app.listen(port, () => console.log(`server listening on port ${port}`));
