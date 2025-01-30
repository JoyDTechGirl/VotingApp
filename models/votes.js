'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class votes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      votes.associate = (models) => {
        votes.belongTo(models.candidates,{foreignKey:'candidatesId',as:'candidates'})
      }
      // define association here
    }
  }
  votes.init({
    candidatesId: DataTypes.UUID,
    NoOfVotes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'votes',
  });
  return votes;
};