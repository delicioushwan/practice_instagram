module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('posts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
  }, {
    timestamps: true,
    underscored: true,
  });
  Post.associate = function (models) {
    Post.hasMany(models.likes, { as: 'likes' });
    Post.hasMany(models.comments, { as: 'comments' });
    Post.hasMany(models.pictures, { as: 'pictures' });
    Post.belongsTo(models.users, {as: 'users', foreignKey: 'user_id'});
  };

  return Post;
};
