'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Event.init({
    id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    date: DataTypes.DATE,
    location: DataTypes.STRING,
    allowedAttendees: DataTypes.STRING,
    waitlist: DataTypes.INTEGER,
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};