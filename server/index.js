'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Users = require('./db/schema.js')
const smartcar = require('smartcar');
const path = require('path');

const app = express()
  .use(cors());
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use('/', express.static(path.join(__dirname, '../public')));

// TODO: Authorization Step 1a: Launch Smartcar authentication dialog
const client = new smartcar.AuthClient({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectUri: process.env.REDIRECT_URI,
  scope: ['read_odometer'],
  testMode: true,
});

// global variable to save accessToken
let access;

app.get('/login', (req, res) => {
  // TODO: Authorization Step 1b: Launch Smartcar authentication dialog
  const link = client.getAuthUrl();
  res.redirect(link);
});

app.get('/exchange', (req, res) => {
  // TODO: Authorization Step 3: Handle Smartcar response
  const code = req.query.code;

  // TODO: Request Step 1: Obtain an access token
  return client.exchangeCode(code)
  .then((_access) => {    
    // in a production app you'll want to store this in some kind of persistent storage
    access = _access;
    res.redirect('/');
  });
});

app.get('/vehicle', (req, res) => {
  return smartcar.getVehicleIds(access.accessToken)
    .then((data) => {
      // TODO: Request Step 2: Get vehicle ids
      // the list of vehicle ids
      return data.vehicles;
    })
    .then((vehicleIds) => {
      // TODO: Request Step 3: Create a vehicle
      // instantiate the first vehicle in the vehicle id list
      const vehicle = new smartcar.Vehicle(vehicleIds[0], access.accessToken);
      // TODO: Request Step 4: Make a request to Smartcar API
      return vehicle.odometer();
    })
    .then((odometer) => {
      res.send(odometer);
    });
});

app.get('/user/:userID', (req, res) => {
  // TODO: request user info from mongo
  Users.findOne({user: req.params.userID}, (err, user) => {
    if (err) {
      res.status(404).send(err)
    } else {
      console.log(user);
      res.status(200).send(user);
    }
  });
});

app.post('/user/:userID', (req, res) => {
  // TODO: add a new user to mongo
  Users.create(req.body, (err, user) => {
    if(err) {
      res.status(400).send(err);
    } else {
      res.sendStatus(201);
    }
  });
}); 

app.put('/user/:userID/update', (req, res) => {
  // TODO: update an existing user in mongo
  let query = {user: req.params.userID};
  console.log(req.body);
  Users.findOneAndUpdate(query, req.body, (err, user) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.sendStatus(201);
    }
  });
});

app.delete('/user/:userID', (req, res) => {
  Users.findOneAndDelete({user: req.params.userID}, (err, user) => {
    if (err) {
      res.send('User record was not deleted:' + err)
    } else {
      console.log('User record deleted');
    }
  })
})

app.listen(port, () => console.log('listening on: ', port));