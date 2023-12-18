const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      qunatity: { type: Number, default: 1 },
      price: { type: Number },
      subtotal: { type: Number },
    },
  ],
  grandTotal: { type: Number },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
