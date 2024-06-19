const { validateBook } = require("../models/book.model");
const Book = require("../models/book.model");
const { BookStudent } = require("../models/bookStudent.model");
const { validateObjectId } = require("../utils/imports");
const { Op } = require('sequelize');

/***
 * Get all books
 * @param req
 * @param res
 */
exports.getAllBooks = async (req, res) => {
  try {
    let { limit, page, name, author, publisher, publicationYear, subject } = req.query;

    if (!page || page < 1) page = 1;
    if (!limit) limit = 10;

    let searchConditions = {};
    if (name) searchConditions.name = { [Op.like]: `%${name}%` };
    if (author) searchConditions.author = { [Op.like]: `%${author}%` };
    if (publisher) searchConditions.publisher = { [Op.like]: `%${publisher}%` };
    if (publicationYear) searchConditions.publicationYear = publicationYear;
    if (subject) searchConditions.subject = { [Op.like]: `%${subject}%` };

    const options = {
      where: searchConditions,
      offset: (page - 1) * limit,
      limit: parseInt(limit),
    };

    const books = await Book.findAndCountAll(options);
    const totalPages = Math.ceil(books.count / limit);

    res.send({
      data: books.rows,
      totalPages: totalPages,
      currentPage: page,
      totalItems: books.count
    });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};


/***
 * Create a new book
 * @param req
 * @param res
 */
exports.createBook = async (req, res) => {
  try {
    const { error } = validateBook(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const duplicate = await Book.findOne({ where: { name: req.body.name } });
    if (duplicate)
      return res.status(400).send({ message: "Book already exists" });

    const newBook = await Book.create(req.body);

    return res.status(201).send({ message: "CREATED", data: newBook });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

/***
 * Update a book
 * @param req
 * @param res
 */
exports.updateBook = async (req, res) => {
  try {
    if (!validateObjectId(req.params.id))
      return res.status(400).send({ message: "Invalid id" });

    const { error } = validateBook(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const updatedBook = await Book.findByPk(req.params.id);
    if (!updatedBook)
      return res.status(404).send({ message: "Book not found" });

    await updatedBook.update(req.body);

    return res.status(200).send({ message: "UPDATED", data: updatedBook });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};

/***
 * Delete a book
 * @param req
 * @param res
 */
exports.deleteBook = async (req, res) => {
  try {
    if (!validateObjectId(req.params.id))
      return res.status(400).send({ message: "Invalid id" });

    const deletedBook = await Book.findByPk(req.params.id);
    if (!deletedBook)
      return res.status(404).send({ message: "Book not found" });

    await deletedBook.destroy();

    await BookStudent.destroy({ where: { book: req.params.id } });

    return res.send({ message: "DELETED", data: deletedBook });
  } catch (e) {
    return res.status(500).send(e.toString().split('"').join(""));
  }
};
