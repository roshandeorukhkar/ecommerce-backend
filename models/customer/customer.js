const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

const customerSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
        mobile:{
            type: Number,
            index : {
                unique: true
            }
        },
        email: {
            type: String,
            trim: true
        },
        hashed_password: {
            type: String,
        },
        image: {
            type: String,
        },
        status: {
            type: Number,
            default: 1
        },
        about: {
            type: String,
            trim: true
        },
        salt: String,
        role_id: {
            type: Number,
            default: 0
        },
        history: {
            type: Array,
            default: []
        },
        address:{
            type: String
        },
        country : String,
        city : String,
        state : String,
        pincode : String,
        date_added: {
            type: Date,
            default : Date.now
        },
        date_modified: {
            type: Date,
        },
        isOtpVerified : {
            type: Boolean,
            default : false
        },
        isDelete : {
            type : Boolean,
            default : false
        },
        deletedAt: {
            type: Date,
        }
    },
    { timestamps: true }
);
// virtual field
customerSchema
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = uuidv1();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

customerSchema.methods = {
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

// customerSchema.pre('firstName').validate(
//   async firstName =>{
//       const name = firstName.charAt(0).toUpperCase() + firstName.slice(1);
//       return name;
//   }  
// )


module.exports = mongoose.model("Customer" ,customerSchema);

customerSchema.path('mobile').validate(
    async mobile =>{
        const mobileCount = await mongoose.models.Customer.countDocuments({
            mobile
        })
        return !mobileCount
    }, 'Mobile already exists');