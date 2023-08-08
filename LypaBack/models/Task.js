import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: DataTypes.STRING(255)
  },
  Description: {
    type: DataTypes.STRING(255)
  }
}, {
  tableName: 'TASKS',
  timestamps: false
});

export default Task;