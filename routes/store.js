const express = require("express");
const router = express.Router();

const { addStoreData } = require('../controllers/store');
router.post("/addStoreData", addStoreData);

const { storeList } = require("../controllers/store");
router.get("/getStoreList", storeList);

module.exports = router;
