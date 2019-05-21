const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()
  .use(cors());
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

app.use(express.static('public'));

// TODO: Authorization Step 1a: Launch Smartcar authentication dialog

// global variable to save accessToken
let access;

app.get('/login', (req, res) => {
  // TODO: Authorization Step 1b: Launch Smartcar authentication dialog
});

app.get('/exchange', (req, res) => {
  // TODO: Authorization Step 3: Handle Smartcar response

  // TODO: Request Step 1: Obtain an access token
});

app.get('/vehicle', (req, res) => {
  // TODO: Request Step 2: Get vehicle ids

  // TODO: Request Step 3: Create a vehicle

  // TODO: Request Step 4: Make a request to Smartcar API to get odometer reading

});

app.get('/home', (req, res) => {
  // TODO: request user info from mongo

  //TODO: send data to app
});

app.post('/home', (req, res) => {
  // TODO: send user info to the database
}); 

app.patch('/home', (req, res) => {
  // TODO: update user info in the database
})

app.listen(port, () => console.log('listening on: ', port));