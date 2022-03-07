const mongoose = require("mongoose");
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
const { ObjectId } = mongoose.Schema;
const UserSchema = new mongoose.Schema(
    {
        email:{
            type : String,
            require : true,
            unique : true
        },
        hashed_password :{
            type : String,
            require : true
        },
        salt : {
            type : String
        },
        userRole :{
            type : String,
            require : false
        },
        storeId :{
            type : String,
            require : false
        },
        name: {
            type : String,
            require : true
        },
        date_added:{
            type : Date,
            default: Date.now
        }
    },{collection : 'users'}
);

UserSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

UserSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    }
};

module.exports = mongoose.model("Users" ,UserSchema)