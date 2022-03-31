const express = require("express");
const router = express.Router();
const fs = require("fs");
const { sliderValidition } = require("../validator/settingValidator");
const multer = require('multer');
const { v4: uuidv4 } =  require('uuid');
const path = require("path");
const { fstat } = require("fs");
const {save ,list} = require("../controllers/slider");

//update data cb=callback
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const dir = '../ecommerce-admin/public/slider-images';
        if(!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null,dir);
    },
    filename: function(req, file, cb) {   
      cb(null, uuidv4()+ '-' + Date.now()  + path.extname(file.originalname));
    }
  });

  const fileFilter = (req, file, cb) =>{
      const allowedFileTypes = ['image/jpg','image/jpeg', 'image/png']
      if(allowedFileTypes.includes(file.mimetype)) {
          return cb(null, true);
        } else {
            return cb(null, false);
        }
}

let upload = multer({ storage: storage, fileFilter:fileFilter}).single('sliderImg');

router.post("/saveSlider",  upload , save);
router.get("/sliderList",list)

module.exports = router;
