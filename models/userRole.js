const mongoose = require("mongoose");

const userRoleSchema = new mongoose.Schema(
    {
        roleId :{
            type : Number
        },
        roleName :{
            type : String ,
            required :  [true, 'Role name is required']
        },
        accessModuleId :{
            // type : String,
            type : Array,
            required :  true
        },
        user_id : {
            type: mongoose.Types.ObjectId,
            required:true
        },
        storeId : { 
            type: mongoose.Types.ObjectId,
        },
        status :{
            type:Boolean ,
            required : true,
            default : true,
            // ref : "1 is active & 0 is not diactive",
            Comment: "1 is active & 0 is not diactive"
        },
        isDelete :{
            required : true,
            type : Boolean,
            default : 0,
            // ref : "1 is deleted & 0 is not deleted",
            Comment:  "1 is deleted & 0 is not deleted"
        },
        createdDate :{
            type : Date ,
            default : Date.now
        }
    },{collection: 'userRoles' }
);
module.exports = mongoose.model("userRole" ,userRoleSchema)