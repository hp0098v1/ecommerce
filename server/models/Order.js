const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
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
  address: { type: String },
  status: {
    type: String,
    enum: [
      "Not Processed",
      "Successful Payment",
      "Processing",
      "Dispatched",
      "Delivered",
    ],
    default: "Not Processed",
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
