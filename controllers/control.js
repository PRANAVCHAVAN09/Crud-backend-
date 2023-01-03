const User = require("../models/user");

exports.createUser = (req, res) => {
  console.log("created");
  var user = new User({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  });
  console.log(user);
  user.save(function (err, user) {
    if (err) {
      return next(err);
    }
    console.log(user);
    res.json(201, user);
  });
};
exports.updateUser = (req, res) => {
  var payload = {
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
  };
  const data = User.updateOne({ _id: req.body._id }, { $set: payload }).exec(
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "NO USER FOUND",
        });
      }
      console.log(user);
      res.json(user);
    }
  );
  console.log(data);
};
exports.getUser = (req, res) => {
  let user = User.find().exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "NO USER FOUND",
      });
    }
    console.log(user);
    res.json(user);
  });
  //   res.send(user);
  //   res.json(user);
};
exports.deleteUser = (req, res) => {
  const _id = req.body._id;
  let user = User.deleteOne(_id).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "NO USER FOUND",
      });
    }
    console.log(user);
    res.json(user);
  });
  //   res.send(user);
  //   res.json(user);
};
