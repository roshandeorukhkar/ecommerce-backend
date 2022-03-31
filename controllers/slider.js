const formidable = require("formidable");
var path = require("path");
const fs = require("fs");
const _ = require("lodash");
const { errorHandler } = require('../helpers/dbErrorHandler');
const sliderSchema = require("../models/setting/sliderModule");

exports.save =  async (req, res, next) =>{
  try{
    if(req.file){
        var imageData = new sliderSchema({
          title: req.body.title,
          image : req.file.filename,
          link : req.body.link,
          sequence: req.body.sequence,
          description:req.body.description
        });
        const result = await imageData.save();
        return res.json({
          status: true,
          message: "Slider save successfully",
        });
    }else{
      return res.status(400).json({
        status: false,
        message: "Something went wrong for update",
        errors: { 'sliderError' : "Please select image." }
      });
    }
  }catch{
    return res.status(400).json({
      status: false,
      message: "Something went wrong for update",
      error: errorHandler(err_),
    });
  }
}

exports.list = async (req , res) => {
  try{
    const result = await sliderSchema.find({isDelete : false});
    return res.json({
      result
    });
  }catch (error) {
    return res.status(400).json({
      status: false,
      message: "Something went wrong for update",
    });
  }
}