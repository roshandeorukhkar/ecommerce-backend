const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userRoleSchema = new mongoose.Schema(
    {
        roleId :{
            type : Number
        },
        name :{
            type : String ,
            required : true
        },
        access_moduleId :{
            type : Number,
            required : true
        },
        parent_RoleId : {
            type : Number,
            required : true
        },
        status : {
            type : Boolean,
            required : true
        },
        date_added :{
            type : Date ,
            required : true
        }
    }
);
module.exports = mongoose.model("UserRole" ,userRoleSchema)