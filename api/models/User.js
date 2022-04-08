module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: DataTypes.STRING(255),
      password: DataTypes.STRING(1000),
      name: DataTypes.STRING,
    },
    {
      // options
      paranoid: true,
    }
  );
  User.associate = function (models) {};
  return User;
};
