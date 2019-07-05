const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const API_PORT = process.env.API_PORT || 4000;


app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(require('./routes'));

app.listen(API_PORT, () => {
  console.log(`Example app listening on ${API_PORT}!`);
});
