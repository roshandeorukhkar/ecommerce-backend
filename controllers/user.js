const Users = require('../models/user');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { getModuleAccess } = require("../services/users/accessProviders")
const moment = require('moment');

//using async/await
exports.signUp = async (req, res) => {
    try {
        const user = await new Users(req.body);
        await user.save((err, user) => {
            if (err) {
                // return res.status(400).json({ err });
                return res.status(400).json({
                    error: 'Email is taken'
                });
            }
            res.status(200).json({ user });
        });
    } catch (err) {
        console.error(err.message);
    }
};

exports.signIn = async (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    console.log("user", user)
    if (!user) {
        return res.status(400).json({
            error: 'User with that email does not exist. Please signup'
        });
    }
    // if user is found make sure the email and password match
    // create authenticate method in user model
    if (!user.authenticate(password)) {
        return res.status(401).json({
            error: 'Email and password dont match'
        });
    }
    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry date
    res.cookie('t', token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    const { modules } = await getModuleAccess(user._id);
    return res.json({ token, user, modules});
};

exports.signout = (req, res) => {
    console.log("I m in signout")
    res.clearCookie('t');
    res.json({ message: 'Signout success' });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'user'
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};

exports.read = (req, res) => {
    return res.json(req.user);
};

exports.userById = (req, res, next, id) => {
    Users.findById(id)
       .exec((err, user) => {
           if (err || !user) {
               return res.status(400).json({
                   error: 'user not found'
               });
           }
           req.user = user;
           next();
       });
};

exports.remove = (req, res) => {
    let user = req.user;
    user.remove((err, deleted) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Deleted user',
            data: deleted
        });
    });
 };


 exports.update = (req, res) => {

    const user = req.user;
    user.ownerName = req.body.ownerName;
    user.email = req.body.email;
    user.address = req.body.address;
    user.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
 };

 
exports.list = (req, res) => {
       
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    
    Users.find()
        .sort([[sortBy, order]])
        .exec((err, user) => {
            if (err) {
                return res.status(400).json({
                    error: 'user not found'
                });
            }
            res.json(user);
     
        });
 };
 