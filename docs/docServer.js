var express = require("express");
var dotenv = require("dotenv");

dotenv.config();

var server = express();

server.use("/", express.static(__dirname + "/html"));
server.use("/resources", express.static(__dirname + "/resources"));
server.use("/swagger", express.static(__dirname + "/swagger"));

server.listen(process.env.DOC_SERVER_PORT || 8888);
