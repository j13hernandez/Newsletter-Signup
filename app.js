const express = require('express');
const bodyParser = require('body-parser');
const mailchimp = require('@mailchimp/mailchimp_marketing');

const port = 3000;
const app = express();
const listId = 'e4345dd282';

mailchimp.setConfig({
  apiKey: '03741360272faa99f8c52cbb8367d569-us20',
  server: 'us20',
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

app.post('/', (req, res) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;

  const run = async () => {
    const response = await mailchimp.lists.batchListMembers(listId, {
      members: [
        {
          email_address: email,
          status: 'subscribed',
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
          },
        },
      ],
    });
    if (response.errors.length) {
      console.log('!not', response.errors.length);
      res.sendFile(__dirname + '/failure.html');
    } else {
      console.log('empty', response.errors.length);
      res.sendFile(__dirname + '/success.html');
    }
  };
  run();
  console.log(res.statusCode);
});

app.listen(port, () => {
  console.log('Listening');
});

//List ID
//e4345dd282

//API Key
//03741360272faa99f8c52cbb8367d569-us20
