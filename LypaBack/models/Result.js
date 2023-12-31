import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import Task from './Task.js';
import User from './User.js';

const Result = sequelize.define('Result', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    TaskID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Score: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'RESULTS',
    timestamps: false
  });
  
  // Define foreign key associations
  Result.belongsTo(Task, { foreignKey: 'TaskID' });
  Result.belongsTo(User, { foreignKey: 'UserID' });
  
  export default Result;