const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const dbModels = require('./api/models');
const logger = require('morgan');

const config = require('./config/config');
const indexRouter = require('./api/routes/index');

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

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

module.exports = app;
