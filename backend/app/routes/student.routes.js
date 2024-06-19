const {
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  studentLogin,
  getCurrentStudent,
} = require("../controllers/student.controller");
const { auth } = require("../middlewares/auth.middleware");

module.exports = (app) => {
  var router = require("express").Router();

  // Create a new User
  router
    .route("/register")
    /**
     * @swagger
     * /students:
     *   get:
     *     tags:
     *       - Student
     *     description: Returns all Students
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
    .post(createStudent)

  // Create a new User
  router
    .route("/:id")
    /**
     * @swagger
     * /students/{id}:
     *   put:
     *     tags:
     *       - Student
     *     description: Create a student
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: student id
     *         in: path
     *         type: string
     *         required: true
     *       - name: body
     *         description: Fields for a student
     *         in: body
     *         required: true
     *         schema:
     *           $ref: '#/definitions/Student'
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
    .put([auth, updateStudent])
    /**
     * @swagger
     * /students/{id}:
     *   delete:
     *     tags:
     *       - Student
     *     description: Delete Student
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: student id
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
    .delete([auth, deleteStudent])
    /**
     * @swagger
     * /students/{id}:
     *   delete:
     *     tags:
     *       - Student
     *     description: Get Student
     *     security:
     *       - bearerAuth: -[]
     *     parameters:
     *       - name: id
     *         description: student id
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
    .get([auth, getCurrentStudent]);
    

    router.route("/login")
    /**
     * @swagger
     * /users/login:
     *   post:
     *     tags:
     *       - User
     *     description: Student Login
     *     parameters:
     *       - name: body
     *         description: Fields for a student
     *         in: body
     *         required: true
     *         schema:
     *           properties:
     *            email:
     *              type: string
     *            password:
     *              type: string
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
    .post(studentLogin)

  app.use("/api/students", router);
};
