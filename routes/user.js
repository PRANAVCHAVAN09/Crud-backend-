const express = require("express");
const multer = require("multer");
const {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getImage,
  getUserById,
} = require("../controllers/control");

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.filename + "-" + Date.now() + ".jpg");
    },
  }),
});

router.param("_id", getUserById);

// const acceptFormData = multer();

router.get("/", (req, res) => {
  res.send(` user with data `);
});

// router.options("/create", function (req, res, next) {
//   res.set("Allow", "POST");
//   res.send("GET");
//   next(); // added line
// });

router.get("/users", getUser);
router.get("/uploads/:imageUrl", getImage);
// router.delete("/uploads/:imageUrl", delImage);

router.post("/create", upload.single("myfile"), createUser);
// router.post("/photo", upload.single("myFile"), photo);

router.put(
  "/update/:_id",
  // acceptFormData.any(),
  upload.single("myfile"),
  updateUser
);
// router.delete("/delete/:_id", deleteUser);
router.post("/delete", deleteUser);

module.exports = router;
