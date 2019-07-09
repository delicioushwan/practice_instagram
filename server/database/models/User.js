module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_account: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: false,
    },
    follower_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    following_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    post_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    about: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    main_image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  }, {
    timestamps: true,
    underscored: true,
  });
  User.associate = function (models) {
    User.hasMany(models.comments, { as: 'comments' });
    User.hasMany(models.posts, { as: 'posts' });
    User.hasMany(models.likes, { as: 'likes' });
  };

  return User;
};
