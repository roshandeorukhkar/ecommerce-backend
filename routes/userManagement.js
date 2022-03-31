const express = require("express");
const router = express.Router();
const {userById, read, list, remove, update, create ,updateStatus, changeStatus} = require('../controllers/userManagement');
const { userValidator } = require("../validator");
const { userUpdateValidator } = require("../validator");


router.get('/userManagement/:userId', read);
router.get('/userManagement', list);
router.delete("/userManagement/:userId", remove);
router.put("/userManagement/:userId",userUpdateValidator, update);
router.post('/userManagement/create', userValidator, create);

router.post("/userManagement/status/:userId", updateStatus);

router.post("/userManagement/statusChange/:userId", changeStatus);

router.param('userId', userById);

module.exports = router;
