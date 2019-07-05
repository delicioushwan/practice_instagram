module.exports = (sequelize, DataTypes) => (
  sequelize.define('likes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: true,
    underscored: true,
  })
);
