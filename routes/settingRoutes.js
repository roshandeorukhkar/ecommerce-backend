const express = require("express");
const router = express.Router();
const {save} = require("../controllers/slider");
const { sliderValidition } = require("../validator/settingValidator");

router.post("/saveSlider", sliderValidition , save);

module.exports = router;
