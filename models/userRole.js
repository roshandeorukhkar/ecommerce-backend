const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userRoleSchema = new mongoose.Schema(
    {
        roleId :{
            type : Number
        },
        roleName :{
            type : String ,
            required :  [true, 'Role name is required']
        },
        modules :{
            type : Array
        },
        assingTo : {
            type : String,
            required :  [true, 'User Id is required']
        },
        status :{
            type:Boolean ,
            required : true,
            default : true,
            ref : "1 is active & 0 is not diactive",
        },
        isDelete :{
            required : true,
            type : Boolean,
            default : 0,
            ref : "1 is deleted & 0 is not deleted",
        },
        createdDate :{
            type : Date ,
            default : Date.now
        }
    }
);
module.exports = mongoose.model("UserRole" ,userRoleSchema)