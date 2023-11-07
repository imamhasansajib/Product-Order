const User = require("../models/userModel");

const createUser = async (req, res) => {
  try {
    const checkUser = await User.findOne({ email: req.body.email });

    if (checkUser) {
      res.status(200).send({
        success: true,
        msg: req.body.email + " email already exitsts!",
      });
    } else {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        mobileno: req.body.mobileno,
        image: "/images/" + req.file.filename,
      });

      const userData = await user.save();
      res.status(200).send({ success: true, msg: "User Data", data: userData });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).send({ success: true, msg: "Users Data", data: users });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.body.user_id });

    res.status(200).send({ success: true, msg: "User deleted successfully!" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const checkUser = await User.findOne({ email: req.body.email });

    var user_id = req.body.user_id;
    var obj;

    if (checkUser) {
      return res.status(200).send({
        success: true,
        msg: req.body.email + " email already exitsts!",
      });
    } else {
      if (req.file !== undefined) {
        obj = {
          name: req.body.name,
          email: req.body.email,
          mobileno: req.body.mobileno,
          image: "/images/" + req.file.filename,
        };
      } else {
        obj = {
          name: req.body.name,
          email: req.body.email,
          mobileno: req.body.mobileno,
        };
      }
    }

    var updatedData = await User.findByIdAndUpdate(
      { _id: user_id },
      { $set: obj },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      msg: "User updated successfully!",
      data: updatedData,
    });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error.message });
  }
};

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
};
