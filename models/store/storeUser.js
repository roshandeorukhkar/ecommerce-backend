const mongoose = require('mongoose');
const storeSchema =  require('./store');
const { Schema } = mongoose;

const storeUserSchema = new mongoose.Schema(
    {
        // storeId: {
        //     type: String,
        // },
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
            default: 1
        },
        date_added: {
            type: Date,
        },
        date_modified: {
            type: Date,
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
