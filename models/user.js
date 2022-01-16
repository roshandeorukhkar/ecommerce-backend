const mongoose = require("mongoose");
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const UserSigninSchema = new mongoose.Schema(
    {
        email:{
            type : String,
            require : true,
            unique : true
        },
        password :{
            type : String,
            require : true
        },
        // hashed_password :{
        //     type : String,
        //     require : true
        // },
        // salt : {
        //     type : Number,
        //     require : true
        // },
        // userRole :{
        //     type : Number,
        //     require : true
        // },
        date_added:{
            type : Date,
            default: Date.now
        }
    },{collection : 'admins'}
);

// UserSigninSchema
//     .virtual('password')
//     .set(function(password) {
//         this._password = password;
//         this.salt = uuidv1();
//         this.hashed_password = this.encryptPassword(password);
//     })
//     .get(function() {
//         return this._password;
//     });

// UserSigninSchema.methods = {
//     authenticate: function(plainText) {
//         return this.encryptPassword(plainText) === this.hashed_password;
//     },

//     encryptPassword: function(password) {
//         if (!password) return '';
//         try {
//             return crypto
//                 .createHmac('sha1', this.salt)
//                 .update(password)
//                 .digest('hex');
//         } catch (err) {
//             return '';
//         }
//     }
// };

module.exports = mongoose.model("UserSigninSchema" ,UserSigninSchema)