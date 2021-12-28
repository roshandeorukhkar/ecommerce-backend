const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = mongoose.Schema(
    {
        orderId :{
            require : true,
            type : Number
        },
        productId :{
            require : true,
            type : Number
        },
        invoiceNo :{
            require : true,
            unique : true,
            trim : true,
            type: Number
        },
        invoicePrefix :{
            require : true,
            type: String
        },
        customerId :{
            require : true,
            type: Number
        },
        firstName :{
            type: String
        },
        lastName :{
            type: String
        },
        email :{
            require : true,
            trim : true ,
            unique: true,
            type: String
        },
        mobile :{
            unique: true,
            require : true,
            trim : true,
            maxlength : 10,
            type: Number
        },
        sellerId :{
            require : true,
            type: String
        },
        status: {
            type: String,
            default: "Not processed",
            enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
        },
        payment_firstName :{
            require : true,
            type: String
        },
        payment_lastName :{
            require : true,
            type: String
        },
        payment_Company :{
            require : true,
            type: String
        },
        payment_address_1 :{
            require : true,
            type: String
        },
        payment_address_2 :{
            type: String
        },
        payment_city :{
            require : true,
            type: String
        },
        payment_pincode :{
            require : true,
            type: Number
        },
        payment_country :{
            require : true,
            type: String
        },
        payment_countryId :{
            require : true,
            type: Number
        },
        payment_method :{
            require : true,
            type: String
        },
        payment_transactionId :{
            require : true,
            type: Number
        },
        shipping_firstName :{
            require : true,
            type: String
        },
        shipping_lastName :{
            require : true,
            type: String
        },
        shipping_company :{
            require : true,
            type: String
        },
        shipping_address_1 :{
            require : true,
            type: String
        },
        shipping_address_2:{
            type: String
        },
        shipping_city :{
            require : true,
            type: String
        },
        payment_status: {
            require : true,
            type : Number
        },
        shipping_status : {
            require : true,
            type : Number
        }
    }
)
module.exports = mongoose.model("Order" , orderSchema);