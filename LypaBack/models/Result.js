import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import Task from './Task.js';
import User from './User.js';

const Result = sequelize.define('Result', {
    TaskID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false
    },
    Score: {
      type: DataTypes.INTEGER
    },
    ChatID: {
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