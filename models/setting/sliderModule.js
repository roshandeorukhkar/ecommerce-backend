const mongoose = require("mongoose");

const sliderModule = new mongoose.Schema(
    {
        title : {
            type : String,
            required: true
        },
        image: {
            data: Buffer,
            contentType: String
        },
        link: {
            type: String
        },
        sequence: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        status: {
            type: Boolean,
            default: false
        },
        isDelete:{
            type : Boolean,
            default: false
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        },
    },{
        timestamps:true 
    },{
        collection : 'SliderImages'
    }
);
module.exports = mongoose.model("SliderImages",sliderModule);