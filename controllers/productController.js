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

module.exports = {
  createProduct,
};
