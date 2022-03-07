const User = require('../models/customer/customer');
//const User = require('../models/customer');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt'); // for authorization check
const { errorHandler } = require('../helpers/dbErrorHandler');
const { getModuleAccess } = require("../services/users/accessProviders")

// using promise
exports.signup = (req, res) => {
    // console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                // error: errorHandler(err)
                error: 'Email is taken'
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        });
    });
};

// using async/await
// exports.signup = async (req, res) => {
//     try {
//         const user = await new User(req.body);
//         console.log(req.body);

//         await user.save((err, user) => {
//             if (err) {
//                 // return res.status(400).json({ err });
//                 return res.status(400).json({
//                     error: 'Email is taken'
//                 });
//             }
//             res.status(200).json({ user });
//         });
//     } catch (err) {
//         console.error(err.message);
//     }
// };

exports.signin = (req, res) => {
    // find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'user with that email does not exist.'
            });
        }
        // if user is found make sure the email and password match
        // create authenticate method in user model
        if (!User.authenticate(password)) {
            return res.status(401).json({
                error: 'Email and password dont match'
            });
        }
        // generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        // persist the token as 't' in cookie with expiry date
        res.cookie('t', token, { expire: new Date() + 9999 });
        // return response with user and token to frontend client
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } });
    });
};

exports.signout = (req, res) => {
    res.clearCookie('t');
    res.json({ message: 'Signout success' });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'user'
});

exports.isAuth = async (req, res, next) => {
    const isAuthenticated = await checkAuthenticForModule(req.user, req.route.path);
    console.log("isAuthenticated", isAuthenticated)
    if (!isAuthenticated) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};
async function checkAuthenticForModule(user, modulePath) {
    if(user && modulePath) {
       const moduleList = await getModuleAccess(user)
       return modulePath, moduleList.modules.some((o) => modulePath.startsWith(o.path))
    }
}
// exports.isAdmin = (req, res, next) =         > {
//     if (req.profile.role === 0) {
//         return res.status(403).json({
//             error: 'Admin resourse! Access denied'
//         });
//     }
//     next();
// };

/**
 * google login full
 * https://www.udemy.com/instructor/communication/qa/7520556/detail/
 */
