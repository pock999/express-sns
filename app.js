const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');

const dbModels = require('./api/models');

const config = require('./config/config');
const Routes = require('./api/routes/index');

const bootstrap_data = require('./bootstrap_data');

const app = express();

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger_output.json'); // 剛剛輸出的 JSON

// global
const dayjs = require('dayjs');
const _ = require('lodash');

global.dayjs = dayjs;
global._ = _;
global.JsonReParse = (obj) => JSON.parse(JSON.stringify(obj));
global.JsonSerialize = (obj) => JSON.stringify(obj);
global.JsonParse = (obj) => JSON.stringify(obj);
global.config = config;

dbModels.sequelize
  .sync(config.database.sync)
  .then(async () => {
    console.log('=== sequelize.sync start ===');

    if (config.bootstrapData === true) {
      await bootstrap_data();
    }

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
app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/', Routes);

module.exports = app;
