const { json } = require("body-parser");
const StoreSchema = require("../models/store/store");
const UserRoleinSchema = require('../models/userRole');
const User = require("../models/store/storeUser");

// Get moongose error

const errorFormat = (e) => {
  const errors = {};
  allError = e.substring(e.indexOf(":") + 1).trim();
  allErrorInArrayFormat = allError.split(",").map((e) => e.trim());
  allErrorInArrayFormat.forEach((error) => {
    const [key, value] = error.split(":").map((err) => err.trim());
    errors[key] = value;
  });
  return errors;
};

exports.addStoreData = async (req, res) => {
  //console.log(" gauravvvvs",req.body);
  if (!(req.body.storeId)  ) {  
  try {
    const { storeName, ownerName, email, password, address, userId, mobile } = req.body;
    var storeDetails = new StoreSchema({
      storeName: storeName,
      ownerName: ownerName,
      address:address,
      userId:userId,
      mobile:mobile,
    });
   
    const result_ = await storeDetails.save();

    var userDetails = new User({
      password: password,
      email: email,
      storeId:result_._id
    });
   
    const result1 = await userDetails.save();
    return res.json({
      status: true,
      message: "Store added Successfully",
      result: result_,
      result1: result1,
    });
    
  } catch (e) {
    return res.json({
      errors: errorFormat(e.message),
      status: false,
      message: "Something went wrong.....",
    });
  }
}
else{    
  try{
  const {
      storeName,
      ownerName,
      storeId
    } = req.body;
    var storeDetails = {
      storeName: storeName,
      ownerName: ownerName,
    };
    const filter = { _id : storeId}
    const result_ = await storeTestSchema.findOneAndUpdate(filter,storeDetails ,{new: true, runValidators:true });

      return res.json({
          status: true,
          message: "Store updated Successfully",
          result: result_,
        });
  }catch(e){
      return res.json({
          errors: errorFormat(e.message),
          status: false,
          message: "Something went wrong for update",
        });
  }
  
}
};
// save store Api

exports.storeList = async (req, res) => {
  StoreSchema.find(function (err, data) {
    if (err) {
      return done(err);
    }
    return res.json({
      status: true,
      result: data,
    });
  });
};

exports.getStoreDataById = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    const result = await StoreSchema.findById(storeId);
    return res.json(result);
  } catch (e) {
    return res.status(400).json({
      error: "store not found" + e,
    });
  }
};

exports.deleteStoreData = async (req , res) => {
  try{
    var storeDetails = {
      isDelete : true
    };
    const filter = { _id : req.params.storeId}
    const result_ = await StoreSchema.findOneAndUpdate(filter,storeDetails );
    console.log(result_ , "result_")
      return res.json({
          status: true,
          message: "Store deleted Successfully",
          result: result_,
        });
  }catch (e) {
    return res.status(400).json({
      error: "store not found" + e,
    });
  }
}


exports.addUserRole  = async (req,res) =>{
  if (!(req.body.userRoleId)  ) {
    try {
      const {roleName ,accessModuleId ,assingTo} = req.body;
      var addUserRole = new UserRoleinSchema({
        roleName : roleName  ,
        accessModuleId : accessModuleId,
        assingTo : assingTo,
        status :true,
    });
      const result_ = await addUserRole.save();
      return res.json({
        status: true,
        message: "Role added Successfully",
        result: result_,
      });
    } catch (e) {
      return res.json({
        errors: errorFormat(e.message),
        status: false,
        message: "Something went wrong",
      });
    }
}else{    
  console.log("addUserRole","addUserRole");
    try{
      const {roleName ,accessModuleId ,assingTo ,userRoleId} = req.body;
      var addUserRole = {
        roleName : roleName  ,
        accessModuleId : accessModuleId,
        assingTo : assingTo,
        status :true,
      };
      const filter = { _id : userRoleId}
      const result_ = await UserRoleinSchema.findOneAndUpdate(filter,addUserRole ,{new: true, runValidators:true });
        return res.json({
            status: true,
            message: "User role updated Successfully",
            result: result_,
          });
    }catch(e){
        return res.json({
            errors: errorFormat(e.message),
            status: false,
            message: "Something went wrong for update",
          });
    }
    
  }
}

exports.getUserRoleListData = async (req, res) => {
  UserRoleinSchema.find(function (err, data) {
    if (err) {
      return done(err);
    }
    return res.json({
      status: true,
      result: data,
    });
  });
};


exports.getUserRoleByIdData = async (req, res) => {
  try {
    const roleId = req.params.roleId;
    const result = await UserRoleinSchema.findById(roleId);
    return res.json(result);
  } catch (e) {
    return res.status(400).json({
      error: "store not found" + e,
    });
  }
};

exports.deleteUserRole = async (req , res) => {
  try{
    var userRoleDetails = {
      isDelete : true
    };
    const filter = { _id : req.params.userRoleId}
    const result_ = await UserRoleinSchema.findOneAndUpdate(filter,userRoleDetails );
    console.log(result_ , "result_")
      return res.json({
          status: true,
          message: "User Role deleted Successfully",
          result: result_,
        });
  }catch (e) {
    return res.status(400).json({
      error: "User Role not found" + e,
    });
  }
}