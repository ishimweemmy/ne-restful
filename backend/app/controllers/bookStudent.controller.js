const { Op } = require('sequelize');
const BookStudent = require("../models/bookStudent.model");
const Student = require("../models/student.model");
const Book = require("../models/book.model");
const { validateObjectId } = require('../utils/imports');
const { validateBookStudent } = require("../models/bookStudent.model");

/***
 * Get all bookStudents
 * @param req
 * @param res
 */
exports.getAllBookStudents = async (req, res) => {
  try {
    let { limit, page } = req.query;

    if (!page || page < 1) page = 1;
    if (!limit) limit = 10;

    const options = {
      limit: Number(limit),
      offset: (Number(page) - 1) * Number(limit),
      include: [Book, Student],
    };

    const { count, rows } = await BookStudent.findAndCountAll(options);

    res.send({
      data: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: Number(page),
        itemsPerPage: Number(limit),
        items: rows,
      },
    });
  } catch (e) {
    return res.status(500).send(e.toString());
  }
};

/***
 *  Create a new bookStudent
 * @param req
 * @param res
 */
exports.createBookStudent = async (req, res) => {
  try {
    const { error } = validateBookStudent(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    if (!validateObjectId(req.body.bookId))
      return res.status(400).send({ message: 'Invalid book id' });

    if (!validateObjectId(req.body.studentId))
      return res.status(400).send({ message: 'Invalid student id' });

    const book = await Book.findByPk(req.body.bookId);
    if (!book) return res.status(404).send({ message: 'Book not found' });

    const student = await Student.findByPk(req.body.studentId);
    if (!student) return res.status(404).send({ message: 'Student not found' });

    const isDuplicate = await BookStudent.findOne({
      where: {
        bookId: book.id,
      },
    });
    if (isDuplicate)
      return res.status(400).send({ message: 'Book is already borrowed' });

    const newBookStudent = await BookStudent.create(req.body);

    return res.status(201).send({
      message: 'CREATED',
      data: {
        ...newBookStudent.toJSON(),
        student: student.toJSON(),
        book: book.toJSON(),
      },
    });
  } catch (e) {
    return res.status(500).send(e.toString());
  }
};

/***
 * Update a bookStudent
 * @param req
 * @param res
 */
exports.updateBookStudent = async (req, res) => {
  try {
    if (!validateObjectId(req.params.id))
      return res.status(400).send({ message: 'Invalid Id' });

    const { error } = validateBookStudent(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    if (!validateObjectId(req.body.bookId))
      return res.status(400).send({ message: 'Invalid book Id' });

    if (!validateObjectId(req.body.studentId))
      return res.status(400).send({ message: 'Invalid student Id' });

    const book = await Book.findByPk(req.body.bookId);
    if (!book) return res.status(404).send({ message: 'Book not found' });

    const student = await Student.findByPk(req.body.studentId);
    if (!student) return res.status(404).send({ message: 'Student not found' });

    const isDuplicate = await BookStudent.findOne({
      where: {
        id: { [Op.ne]: req.params.id },
        bookId: req.body.bookId,
      },
    });
    if (isDuplicate)
      return res.status(400).send({ message: 'Book is already borrowed' });

    const updatedBookStudent = await BookStudent.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (updatedBookStudent[0] === 0)
      return res.status(404).send({ message: 'BookStudent not found' });

    return res.status(200).send({
      message: 'UPDATED',
      data: {
        ...updatedBookStudent[1][0].toJSON(),
        student: student.toJSON(),
        book: book.toJSON(),
      },
    });
  } catch (e) {
    return res.status(500).send(e.toString());
  }
};

/***
 * Delete a bookStudent
 * @param req
 * @param res
 */
exports.deleteBookStudent = async (req, res) => {
  try {
    if (!validateObjectId(req.params.id))
      return res.status(400).send({ message: 'Invalid Id' });

    const deletedBookStudent = await BookStudent.destroy({
      where: { id: req.params.id },
    });

    if (!deletedBookStudent)
      return res.status(404).send({ message: 'Book-Student not found' });

    return res.send({
      message: 'DELETED',
      data: deletedBookStudent,
    });
  } catch (e) {
    return res.status(500).send(e.toString());
  }
};
