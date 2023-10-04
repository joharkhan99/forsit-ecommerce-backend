const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const {
  createProduct,
  getProducts,
  getAnalysis,
} = require("./controller/ProductController");
require("dotenv").config();

// app config
const app = express();

// Middleware
app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// file upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

// API routes
app.post("/api/product", upload.single("image"), createProduct);
app.get("/api/products", getProducts);
app.get("/api/analysis", getAnalysis);

// connect mongo and Start the server
const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening on ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
