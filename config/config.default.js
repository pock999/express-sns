module.exports = {
  port: 3000,

  database: {
    host: "localhost",
    dialect: "mariadb",
    name: "express-sns",
    username: "root",
    password: "1qaz!QAZ",
    dialectOptions: {
      charset: "utf8mb4",
    },
  },
};
