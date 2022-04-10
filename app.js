const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');

const dbModels = require('./api/models');

const config = require('./config/config');
const Routes = require('./api/routes/index');

const app = express();

dbModels.sequelize
  .sync(config.database.sync)
  .then(async () => {
    console.log('=== sequelize.sync start ===');
    const user1 = await dbModels.User.create({
      name: '王小明',
      email: 'ming123@google.com',
      password: 'abcd1234',
    });

    console.log('=== sequelize.sync end ===');
  })
  .catch((err) => {
    console.log('error => ', err);
  });

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(cors(corsOptions));
app.use('/', Routes);

module.exports = app;
