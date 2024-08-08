// models/Student.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelize.js';

export const Student = sequelize.define('Student', {
  s_no: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, // Make sure 's_no' is set as primary key if applicable
  },
  roll_no: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true // Ensure roll_no is unique if needed
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  father_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  semester: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
