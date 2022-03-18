const User = require("../models/customer/customer");
//const User = require('../models/customer');
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");
const OtpVerify = require("../models/customer/otpVerification");
// const customer = require("../models/customer");
// const user = require("../models/user");

// using promise
exports.signup = async (req, res) => {
  try {
    const { firstName, mobile, lastName, otp } = req.body;
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
    });
    const result = await user.save();
    var otpSave = "";
    if (result) {
      const otpAdd = new OtpVerify({
        mobileNo: mobile,
        otp: otp,
      });
      otpSave = await otpAdd.save();
    }
    res.json({
      status: true,
      result: result,
      otpData: otpSave,
    });
  } catch (errors) {
    console.log(errors);
    return res.status(400).json({
      status: false,
      errors: {
        mobile: "Mobile No is already exist",
      },
    });
  }
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

exports.otpVerification = async (req, res) => {
  try {
    const { mobileNo, otp } = req.body;
    const genratedOtp = await OtpVerify.findOne({ mobileNo: mobileNo });
    const user = await User.findOne({ mobile: mobileNo });
    if (genratedOtp.otp == otp) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res.cookie("t", token, { expire: new Date() + 9999 });
      const _id = user._id;
      const firstName = user.firstName;
      const lastName = user.lastName;
      const mobileNo_ = user.mobile;
      const role = "4";
      return res.json({
        token,
        status: true,
        message: "You are successfully loged",
        user: {
          _id,
          firstName,
          lastName,
          mobileNo_,
          role,
        },
      });
    } else {
      return res.json({
        status: false,
        message: "Mobile No change and resend OTP",
      });
    }
  } catch (error) {
    console.log("error====== ", error);
    return res.status(401).json({
      status: false,
      errors: "Something is wrong",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    console.log("checkData", req.body);
    const { mobile , otp } = req.body;
    const existUser = await User.findOne({ mobile : mobile });
    if(existUser){
      console.log("existUser",existUser);
      const otpData = await OtpVerify.findOneAndUpdate(
        {mobileNo : mobile},
        {otp : otp},
        {new : true}
      );
      console.log("otpData");
      return res.json({
        status : true,
        otpData : otpData
      })
    } else{
      return res.json({
        status : false,
        errors: "Mobile No is not exist please register and login."
     })
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

exports.signinOld = (req, res) => {
  // find the user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user with that email does not exist.",
      });
    }
    // if user is found make sure the email and password match
    // create authenticate method in user model
    if (!User.authenticate(password)) {
      return res.status(401).json({
        error: "Email and password dont match",
      });
    }
    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 });
    // return response with user and token to frontend client
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "Signout success" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

// exports.isAdmin = (req, res, next) => {
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
