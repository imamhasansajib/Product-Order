const express = require("express");
const product_route = express();

const bodyParser = require("body-parser");
product_route.use(bodyParser.json());
product_route.use(bodyParser.urlencoded({ extended: true }));

product_route.use(express.static("public"));

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(
      null,
      path.join(__dirname, "../public/productImages"),
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

const productController = require("../controllers/productController");
product_route.post(
  "/create-product",
  upload.array("images"),
  productController.createProduct
);

product_route.post("/get-products", productController.getProducts);

product_route.post("/delete-product", productController.deleteProduct);

product_route.post(
  "/update-product",
  upload.array("images"),
  productController.updateProduct
);

product_route.get("/all-products", productController.allProducts);

module.exports = product_route;
