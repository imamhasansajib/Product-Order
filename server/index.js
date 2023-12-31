const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/basic_project");

const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

const userRoute = require("./routes/userRoute");
app.use("/api", userRoute);

const productRoute = require("./routes/productRoute");
app.use("/api", productRoute);

const orderRoute = require("./routes/orderRoute");
app.use("/api", orderRoute);

const port = 8000;
app.listen(port, function () {
  console.log("Backend is running on port " + port);
});
