const { json } = require("body-parser");
const user = require("../models/store/storeUser");
const StoreSchema = require("../models/store/store");
const UserRoleinSchema = require("../models/userRole");
const User = require("../models/store/storeUser");
const AccessModuleSchema = require("../models/accessModule");
const mongoose = require("mongoose");

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

exports.storeSignin = async (req, res) => {
  // find the store based on email
  try {
      const{email , password} = req.body;
      if(!email || !password){
      return res.status(400).json({error:"please fill the data"})
      }
      const storeLogin = await user.findOne({email:email ,password:password});
      if(!storeLogin){
          res.status(400).json("invalid credentials");
      } else{
          res.json("login successfully");
      }
  }catch(err){
      console.log(err)
  }
};

exports.addStoreData = async (req, res) => {
  if (!req.body.storeId) {
    try {
      const { storeName, ownerName, email, password, address, userId, mobile } =
        req.body;
      var storeDetails = new StoreSchema({
        storeName: storeName,
      });

      const result_ = await storeDetails.save();

      var userDetails = new User({
        name: ownerName,
        mobile: mobile,
        address: address,
        password: password,
        email: email,
        storeId: result_._id,
      });
      const result1 = await userDetails.save();
      return res.json({
        status: true,
        message: "Store added Successfully",
      });
    } catch (e) {
      return res.json({
        errors: errorFormat(e.message),
        status: false,
        message: "Something went wrong.....",
      });
    }
  } else {
    try {
      const {
        storeName,
        ownerName,
        email,
        password,
        address,
        userId,
        mobile,
        storeId,
      } = req.body;
      var storeDetails = {
        storeName: storeName,
      };

      const filter = { _id: storeId };
      const result_ = await StoreSchema.findOneAndUpdate(filter, storeDetails, {
        new: true,
      });

      var userDetails = {
        name: ownerName,
        mobile: mobile,
        address: address,
        password: password,
        email: email,
      };
      const userFilter = { storeId: storeId };
      const res_ = await User.findOneAndUpdate(userFilter, userDetails, {
        new: true,
      });
      return res.json({
        status: true,
        message: "Store updated Successfully",
        result: result_,
      });
    } catch (e) {
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
  User.find({ role: 3 })
    .populate("storeId")
    .exec((err, data) => {
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
    const result = await User.findOne({ storeId: storeId }).populate("storeId");
    return res.json(result);
  } catch (e) {
    return res.status(400).json({
      error: "store not found" + e,
    });
  }
};

exports.deleteStoreData = async (req, res) => {
  try {
    var storeDetails = {
      isDelete: true,
    };
    const filter = { _id: req.params.storeId };
    const result_ = await StoreSchema.findOneAndUpdate(filter, storeDetails);
    console.log(result_, "result_");
    return res.json({
      status: true,
      message: "Store deleted Successfully",
      result: result_,
    });
  } catch (e) {
    return res.status(400).json({
      error: "store not found" + e,
    });
  }
};

exports.addUserRole = async (req, res) => {
  if (!req.body.userRoleId) {
    try {
      console.log(req.body);
      const userId = mongoose.Types.ObjectId(req.body.assingTo.value);
      const storeId = mongoose.Types.ObjectId(req.body.storeId);
      const { roleName, accessModuleId } = req.body;
      var addUserRole = new UserRoleinSchema({
        roleName: roleName,
        accessModuleId: accessModuleId,
        user_id: userId,
        storeId: storeId,
        status: true,
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
  } else {
    try {
      const userId = mongoose.Types.ObjectId(req.body.assingTo.value);
      const { roleName, accessModuleId, userRoleId } = req.body;
      var addUserRole = {
        roleName: roleName,
        accessModuleId: accessModuleId,
        user_id: userId,
      };
      const filter = { _id: userRoleId };
      const result_ = await UserRoleinSchema.findOneAndUpdate(
        filter,
        addUserRole,
        { new: true, runValidators: true }
      );
      return res.json({
        status: true,
        message: "User role updated Successfully",
        result: result_,
      });
    } catch (e) {
      return res.json({
        errors: errorFormat(e.message),
        status: false,
        message: "Something went wrong for update",
      });
    }
  }
};

exports.getUserRoleListData = async (req, res) => {
  try {
    const storeId = req.params.storeId;
    let matchObj = {};
    matchObj["storeId"] = mongoose.Types.ObjectId(storeId);
    await UserRoleinSchema.aggregate([
      {
        $match: {
          ...matchObj,
          isDelete: false,
        },
      },
      {
        $lookup: {
          from: User.collection.name,
          localField: "user_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $lookup: {
          from: AccessModuleSchema.collection.name,
          localField: "accessModuleId",
          foreignField: "name",
          as: "accessModule",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          "user.name": 1,
          "accessModule.label": 1,
          roleName: 1,
          accessModuleId: 1,
          createdDate: 1,
          status: 1,
          _id: 1,
          user_id: 1,
        },
      },
    ]).exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "store not found" + err,
        });
      }
      if (data) {
        return res.json({
          status: true,
          result: data,
        });
      }
    });
  } catch (err) {
    return res.status(400).json({
      error: "store not found" + err,
    });
  }
};

exports.getUserRoleByIdData = async (req, res) => {
  try {
    const roleId = mongoose.Types.ObjectId(req.params.roleId);
    const checkResult =  await UserRoleinSchema.aggregate([
      {
        $match : {
          _id : roleId
        }
      },
     {
        $lookup: {
        from : User.collection.name,
        localField : "user_id",
        foreignField : "_id",
        as: "user"
      },
      
    },
    {
      $lookup:{
        from : AccessModuleSchema.collection.name,
        localField : 'accessModuleId',
        foreignField: "name",
        as :"module"
      }
    },
    {
      $project:{
        _id : 1,
        roleName : 1,
        accessModuleId : 1,
        'user.name' : 1,
        'user._id' : 1,
        'module._id' :1,
        'module.name' : 1 ,
        'module.label' : 1 ,
      }
    }
    ]);
    return res.json(checkResult[0]);
  } catch (e) {
    return res.status(400).json({
      error: "store not found" + e,
    });
  }
};

exports.deleteUserRole = async (req, res) => {
  try {
    var userRoleDetails = {
      isDelete: true,
    };
    const filter = { _id: req.params.userRoleId };
    const result_ = await UserRoleinSchema.findOneAndUpdate(
      filter,
      userRoleDetails
    );
    return res.json({
      status: true,
      message: "User Role deleted Successfully",
      result: result_,
    });
  } catch (e) {
    return res.status(400).json({
      error: "User Role not found" + e,
    });
  }
};

exports.storeUserList = async (req, res) => {
  try {
    let matchObj = {};
    const storeId = req.params.storeId;
    matchObj["storeId"] = mongoose.Types.ObjectId(storeId);
    const result = await User.aggregate([
      {
        $lookup: {
          from: UserRoleinSchema.collection.name,
          localField: "_id",
          foreignField: "user_id",
          as: "userRole",
        },
      },
      {
        $match: {
          $and: [
            { ...matchObj },
            { isDelete: false },
            { role: { $nin: [1, 2, 3, 4] } },
            // {'userRole.isDelete' : true}
          ],
        },
      },
      {
        $project: {
          _id: "$_id",
          name: "$name",
        },
      },
    ]);
    return res.json(result);
  } catch (e) {
    return res.status(400).json({
      error: "User Role not found" + e,
    });
  }
};

exports.updateStatus = async (req, res) => {
  console.log("status................",req.params.storeId)
  try{
    var updateData = {
      status : false
    };
    const filter = { _id : req.params.storeId };
    const result_ = await StoreSchema.findOneAndUpdate(
      filter,
      updateData
      );
      console.log(result_);
      return res.json({
        status: true,
        message: "Status Updated successfully",
        result: result_,
      });
    }catch(e){
      console.log(e);
    }
    };
    
    exports.changeStatus =async (req, res) => {
      try{
        var updateData = {
          status : true
        };
        const filter = { _id : req.params.storeId };
        const result_ = await StoreSchema.findOneAndUpdate(
          filter,
          updateData
          );
          console.log(result_);
          return res.json({
            status: true,
            message: "Status Updated successfully",
            result: result_,
          });
        }catch(e){
          console.log(e);
        }
};
