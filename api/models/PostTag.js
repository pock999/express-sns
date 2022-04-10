// 文章標籤(多對多 <Post - Tag>)
module.exports = (sequelize, DataTypes) => {
  const PostTag = sequelize.define(
    'PostTag',
    {},
    {
      // options
      paranoid: true,

      hooks: {},
    }
  );
  PostTag.associate = function (models) {};

  return PostTag;
};
