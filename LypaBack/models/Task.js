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
  ChatID: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'TASKS',
  timestamps: false
});

export default Task;