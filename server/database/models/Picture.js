module.exports = (sequelize, DataTypes) => (
  sequelize.define('pictures', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pic: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  }, {
    timestamps: true,
    underscored: true,
  })
);
