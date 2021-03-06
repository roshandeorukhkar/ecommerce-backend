const express = require("express");
const router = express.Router();

const { storeValidator } = require('../validator');
const { userRoleValidator } =require('../validator');
 
const { addStoreData } = require('../controllers/store');
router.post("/addStoreData",storeValidator, addStoreData);

const { storeSignin } = require("../controllers/store");
router.post("/storesignin",storeSignin); 

const { storeList } = require("../controllers/store");
router.get("/getStoreList", storeList);

const { getStoreDataById } = require("../controllers/store");
router.get("/getStoreDataById/:storeId",getStoreDataById); 


const { deleteStoreData } = require("../controllers/store");
router.get("/deleteStoreData/:storeId",deleteStoreData); 

const {
    addUserRole
    } = require("../controllers/store");

router.post("/addUserRoleData",userRoleValidator, addUserRole);

const { getUserRoleListData } = require("../controllers/store");
router.get("/getUserRoleListData/:storeId" , getUserRoleListData);

const { getUserRoleByIdData } = require("../controllers/store");
router.get("/getUserRoleByIdData/:roleId" ,getUserRoleByIdData);

const { deleteUserRole } = require("../controllers/store");
router.get("/deleteUserRoleData/:userRoleId" ,deleteUserRole);

const { storeUserList } = require("../controllers/store");
router.get("/storeUserList/:storeId" , storeUserList);

// validation 
const { updateStatus } = require("../controllers/store");
router.get("/store/status/:storeId" , updateStatus);

const { changeStatus } = require("../controllers/store");
router.get("/store/statusChange/:storeId" , changeStatus);



module.exports = router;
