const formidable = require("formidable");
var path = require("path");
const fs = require("fs");
const _ = require("lodash");
const { errorHandler } = require('../helpers/dbErrorHandler');


const sliderSchema = require("../models/setting/sliderModule");

exports.save = async (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fileds, files) => {
      if (err) {
        return res.status(400).json({
          error: "Image could not be uploaded",
        });
      }
      var slider = new sliderSchema(fileds);
      if (files.sliderImg) {
        if (files.sliderImg.size > 2000000) {
          return res.status(400).json({
            status: false,
            errors: { 'sliderError' : "Image should be less than 2mb in size." },
          });
        }
        slider.image.data = fs.readFileSync(files.sliderImg.path);
        slider.image.contentType = files.sliderImg.type;
        slider.save((err_, result) => {
            console.log(err_)
          if (err_) {
            return res.status(400).json({
              status: false,
              message: "Something went wrong for update",
              error: errorHandler(err_),
            });
          } else {
            return res.json({
              status: true,
              message: "Slider save successfully",
            });
          }
        });
      }
    });
};
