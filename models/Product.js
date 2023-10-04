const { default: mongoose } = require("mongoose");

// Define a product schema and model
const productSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    stock: Number,
    level: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);
exports.Product = Product;
