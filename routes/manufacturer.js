const express = require("express");
const router = express.Router();
const { create1, productById, read, update, remove, list } = require('../controllers/manufacturer');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

// router.get('/man/:productId', read);
// console.log("router------>",router);
// router.post('/man/create1/:userId', requireSignin, isAuth, isAdmin, create1);

// router.put("/man/:productId/:userId", requireSignin, isAuth, isAdmin, update);

router.get('/manufactures', list);
// router.delete("/man/:productId/:userId", requireSignin, isAuth, isAdmin, remove);

//router.param('productId', productById);
//router.param('userId', userById);


module.exports = router;
