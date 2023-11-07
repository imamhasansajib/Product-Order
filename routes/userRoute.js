const express = require("express");
const user_route = express();

const bodyParser = require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({ extended: true }));

user_route.use(express.static("public"));

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, "../public/images"),
      function (error, success) {
        if (error) {
          console.log(error);
        }
      }
    );
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name, function (error, success) {
      if (error) {
        console.log(error);
      }
    });
  },
});

const upload = multer({ storage: storage });

const userController = require("../controllers/userController");
user_route.post(
  "/create-user",
  upload.single("image"),
  userController.createUser
);

user_route.get("/get-users", userController.getUsers);
user_route.post("/delete-user", userController.deleteUser);
user_route.post(
  "/update-user",
  upload.single("image"),
  userController.updateUser
);

module.exports = user_route;
