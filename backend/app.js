const express = require("express");
const cors = require("cors");

const app = express();

// configure cors
app.use(cors({
  origin: "*"
}));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

require("./app/config/dbConnection");

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Book Tracking Management System." });
});

require("./app/routes/book.routes")(app);
require("./app/routes/student.routes")(app);
require("./app/routes/bookStudent.routes")(app);

module.exports = app;
