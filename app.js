const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const register = require("./routes/userRegistrationRoute");
const { testDbConnection } = require("./config/db");
const userProfile = require("./routes/userProfileRoute");
const genres = require("./routes/genreRoute");

var app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

testDbConnection();

app.get("/", (req, res) => {
  res.status(200).send(" Application One Book Once");
});

app.use("/api/user", register);
app.use("/api/Profile", userProfile);
app.use("/api/genres", genres);

app.listen(port, () => {
  console.log(`Listening to port ${port}!`);
});
