const mongoose = require('mongoose');

const storeUserSchema = new mongoose.Schema(
    {
        storeId: {
            type: String,
        },
        storeName: {
            type: String,
        },
        email: {
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
        }
    },
    { timestamps: true }
);
module.exports = mongoose.model('user', storeUserSchema);
