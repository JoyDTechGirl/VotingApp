'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class candidates extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      candidates.associate = (models) => {
        candidates.hasMany(models.votes,{foreignKey:'candidatesId',as:'votes'})
      }
      // define association here
    }
  }
  candidates.init({
    candidateName: DataTypes.STRING,
    candidateParty: DataTypes.STRING,
    Email: DataTypes.STRING,
    votes: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'candidates',
  });
  return candidates;
};