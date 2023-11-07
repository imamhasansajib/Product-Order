const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: false,
    validate: [imageLimit, "You can pass only 5 product images!"],
  },
});

function imageLimit(val) {
  return val.length <= 5;
}

module.exports = mongoose.model("Product", productSchema);
