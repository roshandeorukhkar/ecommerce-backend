const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        model: {
            type: String,
            trim: true,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        stock_status_id: {
            type: ObjectId,
            trim: true,
            required: true,
        },
        image: {
            type: String,
            required: true
        },
        manufacturer_id: {
            required :true ,
            type: ObjectId
        },
        shipping: {
            required: false,
            type: Boolean
        },
        price: {
            trim : true,
            required: true,
            type: Number,
        },
        tax_class_id: {
            required: true,
            type: String
        },
        weight :{
            required: true,
            type :Number
        },
        weight_class_id :{
            required: true,
            type :Number
        },
        length :{
            required: true,
            type :Number
        },
        width :{
            required: true,
            type :Number
        },
        height :{
            required: true,
            type :Number
        },
        length_class_id :{
            required: true,
            type :Number
        },
        minimum :{
            required: true,
            type :Number
        },
        sort_order :{
            required: true,
            type :Number
        },
        status :{
            required: true,
            type :Boolean
        },
        viewed :{
            required: true,
            type :Number
        },
        approve :{
            required: true,
            type :Boolean
        },
        seller_id :{
            required: true,
            type :Number
        },
        date_added :{
            required: true,
            type :Date
        },
        date_modified :{
            required: true,
            type :Date
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
