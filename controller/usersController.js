const usersModel = require("../model/UserSchema");
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { validationResult } = require("express-validator");

exports.getUsers = async (req, res, next) => {
  try {
    // it's asynchronous, so need to use await here to get the users
    let users = await usersModel.find({});
    res.json({ success: true, data: users }); // or you can also use res.send()}
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await usersModel.findById(id).select("-__v -password -id");
    user.fullname = "julia sucker";
    await user.save();
    if (user) {
      return res.json({ success: true, data: user });
    } else {
      next(new createError.BadRequest("no user found in our database"));
    }
  } catch (err) {
    next(err);
  }
};

// signup
exports.postUser = async (req, res, next) => {
  try {
    const user = new usersModel(req.body);
    await user.save();
    res.send({ success: true, data: user });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

exports.patchUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await usersModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.send({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await usersModel.findByIdAndDelete(id);
    res.send({ success: true, data: user });
  } catch (err) {
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const user = await usersModel.findOne({ email: req.body.email });
    if (!user) {
      next(new createError.NotFound("no such user found in db"));
    } else {
      let check = bcrypt.compareSync(req.body.password, user.password);
      if (!check) {
        next(new createError.NotFound("password does not match"));
      } else {
        const token = jwt.sign(
          { id: user.__id, email: user.email },
          "secretkeyfromjulia"
        );

        res.header("x-auth", token);
        res.send({ success: true, data: user });
      }
    }
  } catch (err) {
    next(err);
  }
};
