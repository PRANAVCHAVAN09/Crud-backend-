const express = require("express");
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/control");
const router = express.Router();

router.get("/", (req, res) => {
  res.send(` user with data `);
});

router.options("/create", function (req, res, next) {
  res.set("Allow", "POST");
  res.send("GET");
  next(); // added line
});

router.get("/users", getUser);

router.post("/create", createUser);

router.put("/update/:_id", updateUser);
router.delete("/delete/:_id", deleteUser);

module.exports = router;
