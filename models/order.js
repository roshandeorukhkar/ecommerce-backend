const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const CartItemSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "Customer" },
    product: { type: ObjectId, ref: "Product" },
    quantity: Number,
    date_added: {
      type: Date,
      default : Date.now
    },
    date_modified: {
        type: Date,
    },
    isDelete : {
        type : Boolean,
        default : false
    },
    deletedAt: {
        type: Date,
    }
  },  
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem", CartItemSchema);

const OrderSchema = new mongoose.Schema(
  {
    products: [CartItemSchema],
    transaction_id: {},
    amount: { type: Number },
    addressId: { type: ObjectId, ref: "CustomerAddress" },
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
    },
    updated: Date,
    user: { type: ObjectId, ref: "Customer" },
    deletedAt :{
        type : Date,
    }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = { Order, CartItem };
