const { json } = require("body-parser");
const StoreSchema = require("../models/store/store");

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

// save store Api

exports.addStoreData = async (req, res) => {
  if (!(req.body.storeId)  ) {
    try {
      const {
        storeName,
        ownerName,
        address,
        userName,
        mobile,
        password,
        email
      } = req.body;
      var storeDetails = new StoreSchema({
        storeName: storeName,
        userName: userName,
        ownerName: ownerName,
        email: email,
        mobile: mobile,
        password: password,
        address: address,
        tokan: "ttttttt",
      });
      const result_ = await storeDetails.save();
      return res.json({
        status: true,
        message: "Store added Successfully",
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
    try{
    const {
        storeName,
        ownerName,
        address,
        userName,
        mobile,
        password,
        email,
        storeId
      } = req.body;
      var storeDetails = {
        storeName: storeName,
        userName: userName,
        ownerName: ownerName,
        email: email,
        mobile: mobile,
        password: password,
        address: address,
        tokan: "ttttttt",
      };
      const filter = { _id : storeId}
      const result_ = await StoreSchema.findOneAndUpdate(filter,storeDetails ,{new: true, runValidators:true });

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
  console.log(req,"check----")
  try{
    var storeDetails = {
      isDelete : true
    };
    const filter = { _id : storeId}
    const result_ = await StoreSchema.findOneAndUpdate(filter,storeDetails );

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