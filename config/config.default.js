module.exports = {
  port: 3000,

  bootstrapData: false,

  database: {
    host: 'localhost',
    dialect: 'mariadb',
    name: 'express-sns',
    username: 'root',
    password: '',
    dialectOptions: {
      charset: 'utf8mb4',
    },
    sync: {
      force: true,
    },
    logging: false,
  },

  jwt: {
    secret: 'secret',
    expiresIn: 15 * 60 * 1000, // 15分
  },
};
