const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const moduleSchema = new mongoose.Schema(
    {
        route :{
            type : String,
            required : true
        }
    }
);
module.exports = mongoose.model("Module",moduleSchema)