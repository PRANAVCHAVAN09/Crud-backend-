const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoutes = require("./routes/user");
const path = require("path");

mongoose
  .connect(
    "mongodb+srv://pranav:pranav123@cluster0.favksck.mongodb.net/test1?retryWrites=true&w=majority",
    {}
  )
  .then(() => {
    console.log("DB CONNECTED");
  });

app.use(cors());
// app.options("/api/create", function (req, res, next) {
//   res.set("Allow", "POST");
//   res.send("GET");
//   next(); // added line
// });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

const port = 8000;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});
