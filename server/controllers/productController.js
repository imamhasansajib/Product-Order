const Product = require("../models/productModel");

const createProduct = async (req, res) => {
  try {
    var prodImages = [];
    for (let i = 0; i < req.files.length; i++) {
      prodImages[i] = "/productImages/" + req.files[i].filename;
    }

    var product = new Product({
      user_id: req.body.user_id,
      name: req.body.name,
      price: req.body.price,
      images: prodImages,
    });

    const productData = await product.save();

    res
      .status(200)
      .send({ success: true, msg: "Product details", data: productData });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user_id: req.body.user_id });

    res
      .status(200)
      .send({ success: true, msg: "Products Data", data: products });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.body.product_id });

    res
      .status(200)
      .send({ success: true, msg: "Product deleted successfully!" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    var obj;
    var prodImages = [];

    if (req.files.length > 0) {
      for (let i = 0; i < req.files.length; i++) {
        prodImages[i] = "/productImages/" + req.files[i].filename;
      }

      obj = {
        name: req.body.name,
        price: req.body.price,
        images: prodImages,
      };
    } else {
      obj = {
        name: req.body.name,
        price: req.body.price,
      };
    }

    var productData = await Product.findByIdAndUpdate(
      { _id: req.body.product_id },
      { $set: obj },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      msg: "Product updated successfully!",
      data: productData,
    });
  } catch (error) {
    return res.status(400).send({ success: false, msg: error.message });
  }
};

const allProducts = async (req, res) => {
  try {
    var productData = await Product.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
    ]);

    res
      .status(200)
      .send({ success: true, msg: "Products Data", data: productData });
  } catch (error) {
    res.status(400).send({ success: false, msg: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  allProducts,
};
