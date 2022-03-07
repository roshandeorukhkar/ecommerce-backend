const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const moduleSchema = new mongoose.Schema(
    {
        
        name :{
            type : String ,
        },
        path :{
            type : String,
        },
        access : {
            type : String,
        }
    }
);
module.exports = mongoose.model("Module" ,moduleSchema)