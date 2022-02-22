const express = require("express");
const router = express.Router();

const { addStoreData } = require('../controllers/store');
router.post("/addStoreData", addStoreData);

const { storeList } = require("../controllers/store");
router.get("/getStoreList", storeList);

const { getStoreDataById } = require("../controllers/store");
router.get("/getStoreDataById/:storeId",getStoreDataById); 


const { deleteStoreData } = require("../controllers/store");
router.get("/deleteStoreData/:storeId",deleteStoreData); 

const {
    addUserRole
    } = require("../controllers/store");

router.post("/addUserRole", addUserRole);


module.exports = router;
