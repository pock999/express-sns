module.exports = {
  port: 3000,

  database: {
    host: "localhost",
    dialect: "mariadb",
    name: "express-sns",
    username: "root",
    password: "",
    dialectOptions: {
      charset: "utf8mb4",
    },
    sync: {
      force: true,
    },
  },
};
