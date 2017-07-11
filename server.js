"use strict"

const server = require("express");
const fs = require("fs");
const path = require("path");

const app = server();
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Listening on port: " + port)
});

app.get("/", (req, res) => {
  let page = path.join(__dirname, "index.html");
  res.sendFile(page, (err) => {
    if (err) {
      console.log(err);
      res.status(err.status).end()
    }
    else {
      console.log("Sent:", page)
    }
  })
});

app.get("/whoami/", (req,res) => {
  let ip = req.headers["x-forwarded-for"] ?
      req.headers["x-forwarded-for"].split(",")[0] :
      req.connection.remoteAddress
      || req.socket.remoteAddress
      || req.connection.socket.remoteAddress;
  res.json({
    ipaddress: ip,
    language: req.headers["accept-language"].split(",")[0],
    software: req.headers["user-agent"].split(") ")[0].split(" (")[1]
  })
});