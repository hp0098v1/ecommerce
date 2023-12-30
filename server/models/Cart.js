const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      name: { type: String },
      imageUrl: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 1 },
      subtotal: { type: Number },
    },
  ],
  grandTotal: { type: Number },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
