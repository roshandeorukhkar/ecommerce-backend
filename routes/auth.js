const express = require("express");
const router = express.Router();

const {
    signup,
    signin,
    signout,
    requireSignin,
    otpVerification,
    resendOtp
} = require("../controllers/auth");
const { userSignupValidator } = require("../validator");

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.post("/getResendOTP",resendOtp)
router.get("/signout", signout);
router.post("/otpVerification",otpVerification);
module.exports = router;
