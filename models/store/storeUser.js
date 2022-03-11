const mongoose = require('mongoose');
const storeSchema =  require('./store');
const { Schema } = mongoose;

const storeUserSchema = new mongoose.Schema(
    {

        email: {
            type: String,
        },
        password:{
            type: String,
        },
        status: {
            type: Number,
            default: 1
        },
        role: {
            type: Number,
            default: 3
        },
        date_added: {
            type: Date,
        },
        date_modified: {
            type: Date,
        },
        name:{
            type:String,
        },
        address:{
            type:String,
        },
        userId:{
            type: Schema.Types.ObjectId,
          //  type:String,
           // type: Schema.Types.ObjectId,
          //  ref: "user"
        },
        mobile:{
            type:String
        },
        deletedAt: {
            type: Date,
        },
        storeId: {
            type: Schema.Types.ObjectId,
            ref: "Store"
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model('user', storeUserSchema);
