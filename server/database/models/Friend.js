module.exports = (sequelize, DataTypes) => (
  sequelize.define('friends', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    follower_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    following_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
    underscored: true,
  })
);
