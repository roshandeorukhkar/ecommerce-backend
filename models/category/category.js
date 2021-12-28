const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
        },
        image:{
            type:String
        },
        top:{
            type:Boolean
        },
        column:{
            type:String
        },
        sort_order:{
            required: true,
            type:String
        },
        status:{
            required: true,
            type:Boolean
        },
        approve:{
            required: true,
            type:Boolean
        },
        date_added:{
            required: true,
            type:Date
        },
        date_modified:{
            required: true,
            type:Date
        },
        category_descriptionId:{
            required: true,
            type:Number
        }
    },
    { timestamps: true }
)
module.exports = mongoose.model("Category" ,categorySchema);