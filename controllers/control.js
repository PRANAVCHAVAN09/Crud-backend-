const User = require("../models/user");
const fs = require("fs");
const path = require("path");
const { default: mongoose } = require("mongoose");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "user not found",
      });
    }
    req.user = user;
    next();
  });
};
exports.createUser = (req, res) => {
  console.log("created", req.body.formData);

  var user = new User({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    photo: {
      data: req.file.filename,
      contentType: "image/jpg",
    },
    imageUrl: req.file.filename,
  });

  // console.log(req.body);
  user.save(function (err, user) {
    if (err) {
      return next(err);
    }
    // console.log(user);
  });
  res.status(201).json(user);
};
exports.updateUser = (req, res) => {
  let user = req.user;
  const fileName = req.user.imageUrl;

  const directoryPath = path.join(__dirname, "../uploads/");
  var payload = {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    photo: {
      data: req.file.filename,
      contentType: "image/jpg",
    },
    imageUrl: req.file.filename,
  };
  console.log("name", req.file);
  const data = User.updateOne({ _id: req.body._id }, { $set: payload }).exec(
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "NO USER FOUND",
        });
      }
    }
  );
  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      return res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }
  });
  res.json(user);
};
exports.getUser = (req, res) => {
  let user = User.find().exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "NO USER FOUND",
      });
    }
    // console.log(user);
    res.json(user);
  });
  //   res.send(user);
  //   res.json(user);
};

exports.deleteUser = (req, res) => {
  console.log("deleted");
  const _id = req.body._id;
  const fileName = req.body.imageUrl;
  const directoryPath = path.join(__dirname, "../uploads/");
  console.log(directoryPath);

  console.log(_id);
  let user = User.deleteOne(mongoose.Types.ObjectId(_id)).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "NO USER FOUND",
      });
    }
    return user;
  });

  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      return res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }
  });
  res.json(user);
};

exports.getImage = (req, res) => {
  if (req.user.photo.data) {
    // res.set("Content-Type", req.user.photo.contentType);
    return res.send(req.user.photo.data);
  }
};
exports.delImage = (req, res) => {
  const fileName = req.params;
  const directoryPath = path.join(__dirname, "../uploads");
  fs.unlink(directoryPath + fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }

    res.status(200).send({
      message: "File is deleted.",
    });
  });
};
