const UserSigninSchema = require('../models/user');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.usersignin = async (req, res) => {
    // find the user based on email
    try {
        const{email , password} = req.body;
        if(!email || !password){
        return res.status(400).json({error:"please fill the data"})
        }
        const userLogin = await UserSigninSchema.findOne({email:email ,password:password});
        if(!userLogin){
            res.status(400).json("invalid credentials");
        } else{
            res.json("user login successfully");
        }
    }catch(err){
        console.log(err)
    }
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'user'
});