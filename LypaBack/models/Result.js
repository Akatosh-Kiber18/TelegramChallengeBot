import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const Result = sequelize.define('Result', {
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