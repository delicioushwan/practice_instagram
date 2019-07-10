module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('comments', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  }, {
    timestamps: true,
    underscored: true,
  });
  Comment.associate = function (models) {
    Comment.hasMany(models.likes, { as: 'likes' });
    Comment.belongsTo(models.users, {as: 'users'});
  };

  return Comment;
};
