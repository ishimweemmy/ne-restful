const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/connectionPool");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       id:
 *         type: integer
 *         format: int64
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *       email:
 *         type: string
 *       password:
 *         type: string
 *       phone:
 *         type: string
 *       nationalId:
 *         type: string
 *       department:
 *         type: string
 *       position:
 *         type: string
 *     required:
 *       - firstName
 *       - lastName
 *       - email
 *       - password
 *       - phone
 *       - nationalId
 *       - department
 *       - position
 */

const Student = sequelize.define("student", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
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

// Sync student model with the database
(async () => {
  try {
    await Student.sync();
    console.log("Student table created successfully");
  } catch (err) {
    console.error("Error syncing Student table:", err);
  }
})();

Student.prototype.generateAuthToken = function () {
  const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET, {expiresIn: "1d"});
  return token;
};

module.exports = Student;

module.exports.validateStudent = (body) => {
  return Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }).validate(body);
};

module.exports.validateStudentLogin = (body) => {
  return Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(body);
};
