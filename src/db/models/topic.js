'use strict';
module.exports = (sequelize, DataTypes) => {
  var Topics = sequelize.define('Topics', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Topic.associate = function(models) {
    // associations can be defined here
    Topic.hasMany(models.Banner, {
      foreignKey: "topicId",
      as: "banners",
    });
  };
  return Topics;
};