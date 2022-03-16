const express = require("express");
const router = express.Router();
const { create, productById, read, update,updateStatus,changeStatus, remove, list } = require('../controllers/specification');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { specificationValidator } = require("../validator");

router.get('/specification/:productId', read);
// console.log("router------>",router);
// router.post('/man/create1/:userId', requireSignin, isAuth, isAdmin, create1);

router.put("/specification/:productId",specificationValidator, update);
router.post("/specification/status/:productId", updateStatus);
router.post("/specification/statusChange/:productId", changeStatus);
router.get('/specification', list);
router.post('/specification/create', specificationValidator, create);
router.delete("/specification/:productId", remove);

router.param('productId', productById);
//router.param('userId', userById);


module.exports = router;
