const mongoose = require("mongoose");
const { ObjectId  } = mongoose.Schema;
var Schema = mongoose.Schema;

const wishlistSchema = new mongoose.Schema(
    {
        user: {
            type: String,
        },
        product: {
            type: String,
        },
        comment_rating:{
            type: String
        },
        name_rating:{
            type: String
        },
        email_rating:{
            type: String
        },
        deletedAt :{
            require : true,
            type : Date
        },
    },
    { timestamps: true }
);

const Wishlist = mongoose.model("Rating", wishlistSchema);

module.exports = { Wishlist, wishlistSchema };

