const express = require("express");
const router = express.Router();

const { addStoreData } = require('../controllers/store');
router.post("/addStoreData",addStoreData);

module.exports = router;
