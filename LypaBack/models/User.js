import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.STRING(255)
    },
    TgID: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'USERS',
    timestamps: false
  });
  
  export default User;