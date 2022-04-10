// 關係(User to User 多對多)
module.exports = (sequelize, DataTypes) => {
  const Relationship = sequelize.define(
    'Relationship',
    {
      // (FanId, FollowId)0 => FanId 追蹤 FollowId 尚未確認
      // (FanId, FollowId)1 => FanId 追蹤 FollowId 已確認
      // (FanId, FollowId)-1 => FanId 封鎖 FollowId
      //
      // 好友定義: (FanId, FollowId)以及 (FollowId, FanId)都要是1
      //
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      // options
      paranoid: true,

      hooks: {},
    }
  );
  Relationship.associate = function (models) {};

  return Relationship;
};
