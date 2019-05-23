"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Users = require("./db/schema.js");
const smartcar = require("smartcar");
const path = require("path");

const app = express().use(cors());
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static(path.join(__dirname, "../public")));

const client = new smartcar.AuthClient({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
  scope: ["read_odometer"],
  testMode: true
});

let access;

app.get("/login", (req, res) => {
  const link = client.getAuthUrl();
  res.redirect(link);
});

app.get("/exchange", (req, res) => {
  const code = req.query.code;

  return client.exchangeCode(code).then(_access => {
    access = _access;
    res.redirect("/");
  });
});

app.get("/vehicle", (req, res) => {
  return smartcar
    .getVehicleIds(access.accessToken)
    .then(data => {
      return data.vehicles;
    })
    .then(vehicleIds => {
      const vehicle = new smartcar.Vehicle(vehicleIds[0], access.accessToken);
      return vehicle.odometer();
    })
    .then(odometer => {
      res.send(odometer);
    });
});

app.get("/user/:userID", (req, res) => {
  Users.findOne({ user: req.params.userID }, (err, user) => {
    if (err) {
      res.status(404).send(err);
    } else {
      console.log(user);
      res.status(200).send(user);
    }
  });
});

app.post("/user/:userID", (req, res) => {
  Users.create(req.body, (err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.sendStatus(201);
    }
  });
});

app.put("/user/:userID/update", (req, res) => {
  let query = { user: req.params.userID };
  console.log(req.body);
  Users.findOneAndUpdate(query, req.body, (err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.sendStatus(201);
    }
  });
});

app.delete("/user/:userID", (req, res) => {
  Users.findOneAndDelete({ user: req.params.userID }, (err, user) => {
    if (err) {
      res.send("User record was not deleted:" + err);
    } else {
      console.log("User record deleted");
    }
  });
});

app.listen(port, () => console.log("listening on: ", port));
