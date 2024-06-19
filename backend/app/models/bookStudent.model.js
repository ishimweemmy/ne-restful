const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/connectionPool");
const Student = require("./student.model");
const Book = require("./book.model");
const Joi = require('joi');

/**
 * @swagger
 * definitions:
 *   BookStudent:
 *     properties:
 *       id:
 *         type: string
 *       studentId:
 *         type: string
 *       bookId:
 *         type: string
 *       bookSerialNumber:
 *         type: string
 *     required:
 *       - studentId
 *       - bookId
 *       - bookSerialNumber
 */

const BookStudent = sequelize.define("bookStudent", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'students',
      key: 'id'
    }
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'books',
      key: 'id'
    }
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW,
  },
});

// Define associations
BookStudent.belongsTo(Student, { foreignKey: 'studentId' });
BookStudent.belongsTo(Book, { foreignKey: 'bookId' });

// Sync bookStudent model with the database
(async () => {
  try {
    await BookStudent.sync();
    console.log("BookStudent table created successfully");
  } catch (err) {
    console.error("Error syncing BookStudent table:", err);
  }
})();

module.exports = BookStudent;

module.exports.validateBookStudent = (body) => {
  return Joi.object({
    studentId: Joi.number().required(),
    bookId: Joi.number().required(),
  }).validate(body);
};
