const bcrypt = require('bcrypt');

// 使用者
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(1000),
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      // options
      paranoid: true,

      hooks: {
        beforeCreate: async (instance, options) => {
          instance.dataValues.password = await bcrypt.hash(
            instance.dataValues.password,
            10
          );
        },
        beforeUpdate: async (instance, options) => {
          instance.dataValues.password = await bcrypt.hash(
            instance.dataValues.password,
            10
          );
        },
      },
    }
  );

  User.associate = function (models) {
    // 使用者之間關聯
    User.belongsToMany(models.User, {
      through: models.Relationship,
      as: 'Fan',
      foreignKey: 'FanId',
      otherKey: 'FollowId',
    });
    User.belongsToMany(models.User, {
      through: models.Relationship,
      as: 'Follow',
      foreignKey: 'FollowId',
      otherKey: 'FanId',
    });
  };

  // classMethods
  User.test = function () {
    console.log('class methods: test()');
  };

  // instanceMethods
  User.prototype.validatePassword = async function (plaintextPassword) {
    const isSame = await bcrypt.compare(plaintextPassword, this.password);
    return isSame;
  };
  return User;
};
