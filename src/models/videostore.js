'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VideoStore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  };
  VideoStore.init({
    rented: {
      type: DataTypes.TEXT,
      defaultValue: '0',
      get () {
        return JSON.parse(this.getDataValue('rented'))
      },
      set (val) {
        return this.setDataValue('rented', JSON.stringify(val))
      }
    }
  },
    {
      sequelize,
      modelName: 'VideoStore',
    });
  return VideoStore;
};
