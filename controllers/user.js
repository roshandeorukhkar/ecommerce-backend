const UserSigninSchema = require('../models/user');
const UserRoleinSchema = require('../models/userRole');
const jwt = require('jsonwebtoken'); // to generate signed token
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorHandler');
const moment = require('moment');

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


exports.addUserRole = async (req ,res) =>{
    try{
        const {roleName ,accessModule} = req.body;
        if(!roleName){
           return res.status(400).json({error : "Please Enter role name"});
        }
        var addUserRole = new UserRoleinSchema({
            name : roleName  ,
            access_moduleId : accessModule,
            parent_RoleId : 1,
            status :true,
            date_added : new Date(Date.now()).toISOString()
        });
        const userRole = await addUserRole.save(function(err,result){
            if(!result._id){
              return  res.status(400).json("Please enter valid data");
            }else{
                UserRoleinSchema.find((err_result,resultlist) => {
                    console.log("resultlist",resultlist);
                    if(err_result)
                    return res.status(400).json({error:"Something is wrong"});
                    else{
                        return res.json({list:resultlist,
                                        data : "Your data inserted successfully",
                                        error : ""
                                        });
                        // res.json();
                    }    
                });
                 
            }
        });
    }catch(err){
        console.log(err);
    }
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'user'
});
