const {
  getAllBookStudents,
  createBookStudent,
  updateBookStudent,
  deleteBookStudent
} = require("../controllers/bookStudent.controller");
const {
  auth
} = require("../middlewares/auth.middleware");

module.exports = (app) => {

  var router = require("express").Router();

  // Create a new User
  router.route("/")
    /**
     * @swagger
     * /bookStudents:
     *   get:
     *     tags:
     *       - BookStudent
     *     description: Returns all Books borrowed
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: page
     *         description: page number
     *         in: query
     *         type: string
     *       - name: limit
     *         description: elements per page
     *         in: query
     *         type: string
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .get([auth, getAllBookStudents])
    /**
     * @swagger
     * /bookStudents:
     *   post:
     *     tags:
     *       - BookStudent
     *     description: Create a bookStudent (book gets borrowed)
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: body
     *         description: Fields for a bookStudent
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/BookStudent'
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .post([auth, createBookStudent]);

  // Create a new User
  router.route("/:id")
    /**
     * @swagger
     * /bookStudents/{id}:
     *   put:
     *     tags:
     *       - BookStudent
     *     description: Update a borrowed book student
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: bookStudent id
     *         in: path
     *         type: string
     *         required: true
     *       - name: body
     *         description: Fields for a bookStudent
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/BookStudent'
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .put([auth, updateBookStudent])
    /**
     * @swagger
     * /bookStudents/{id}:
     *   delete:
     *     tags:
     *       - BookStudent
     *     description: Delete bookStudent
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: bookStudent id
     *         in: path
     *         type: string
     *         required: true
     *     responses:
     *       200:
     *         description: OK
     *       400:
     *         description: Bad Request
     *       404:
     *         description: Not Found
     *       401:
     *         description: Unauthorized
     *       500:
     *         description: Internal Server Error
     */
    .delete([auth, deleteBookStudent]);

  app.use("/api/borrow", router);
};