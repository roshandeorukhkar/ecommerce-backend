const express = require("express");
const router = express.Router();
const { create, productById, read, update, remove, list } = require('../controllers/specification');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/specification/:productId', read);
// console.log("router------>",router);
// router.post('/man/create1/:userId', requireSignin, isAuth, isAdmin, create1);

router.put("/specification/:productId", update);

router.get('/specification', list);
router.post('/specification/create', create);
 router.delete("/specification/:productId", remove);

router.param('productId', productById);
//router.param('userId', userById);


module.exports = router;
