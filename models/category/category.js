const mongoose = require("mongoose");
const { Schema } = mongoose;
const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
           // required: true,
            maxlength: 32,
        },
        description: {
            type: String,
        },
        category: {
            // type: String,
            type: Schema.Types.ObjectId,
        },
        date_modified :{
            require : true,
            type : Date
        },
        deletedAt :{
            //require : true,
            type : Date,
        },
        status: {
            type: Number,
            default: 1
        },
        /*,
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
        } */
    },
    { timestamps: true }
)
module.exports = mongoose.model("Category" ,categorySchema);