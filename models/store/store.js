const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema(
    {
        storeName:{
            type : String,
            required : [ true , 'Store name is required'],
            trim : true,
        },
        userName :{
            type:String,
            required : [ true , 'User Name is required' ],
            trim : true
        },
        ownerName :{
            type:String,
            required : [true , 'Owner name is required'],
            trim : true,
        },
        email :{
            required : [true, 'Email is required'],
            trim : true ,
            // index : {
            //     unique : true,
            // },
            type: String
        },
        mobile :{
            // unique : true,
            // required : [true, 'Mobile no is required' ],
            // maxlength : [10 , "Maximum enter 10 digit"] ,
            type:String,
            // match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
            // trim : true,
            validate: {
                validator: function(v) {
                    var re = /^\d{10}$/;
                    return (!v || !v.trim().length) || re.test(v)
                },
                message: props => `${props.value} is not a valid phone number!`
              },
        },
        password :{
            required : [true, 'Password is required'],
            type:String,
            trim :true
        },
        address :{
            required : [true ,'Address is required'],
            type:String,
            trim : true
        },
        status :{
            required : true,
            type:Boolean ,
            default : true,
        },
        approved :{
            required : true,
            type:Boolean,
            default : 1,
            ref : "1 is approved & 0-disapproved"
        },
        tokan :{
            required : true,
            type:String
        },
        isDelete :{
            required : false,
            type : Boolean,
            default : 0,
            ref : "1 is deleted & 0 is not deleted",
        },
        createdDate :{
            type : Date,
            default : Date.now
        }
    }
);



module.exports = mongoose.model("Store" ,storeSchema);

