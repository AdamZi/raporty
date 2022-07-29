require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
const api = require("./api");

app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/api", api);

app.listen(port, () => console.log(`server listening on port ${port}`));
