const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const port = 3000;
const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  console.log(firstName, lastName, email);
});

app.listen(port, () => {
  console.log('Listening');
});
