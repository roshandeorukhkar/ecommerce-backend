const mongoose = require("mongoose");
const { ObjectId  } = mongoose.Schema;
var Schema = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        brand: {
            type: String,
        },
        attribute:{
            type: Array,
        },
        height: {
            type: String
        },
        width: {
            type: String
        },
        length: {
            type: String
        },
        description: {
            type: String,
        },
        price: {
            type: Number,
        },
        specification:{
            type: Array,
        },
        manufactures:{
            type: String,
        },
        category: {
            type: ObjectId,
            ref: "Category",
        },
        subcategory: {
            type: String,
        },
        quantity: {
            type: Number
        },
        sold: {
            type: Number,
            default: 0
        },
        type: {
            type: Number,
            default: 0
        },
        status: {
            type: Boolean,
            default: true
        },
        images: {
            type : Schema.Types.Mixed
        },
        shipping: {
            type: Boolean
        },
        discount: {
            type : String
        },
        isDelete : {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);

