const express = require("express");
const router = express.Router();
const { create, productById, read, update, remove, list } = require('../controllers/manufacturer');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

 router.get('/manufacturer/:productId', read);
// console.log("router------>",router);
// router.post('/man/create1/:userId', requireSignin, isAuth, isAdmin, create1);

router.put("/manufacturer/:productId", update);

router.get('/manufacturer', list);
router.post('/manufacturer/create', create);
 router.delete("/manufacturer/:productId", remove);

router.param('productId', productById);
//router.param('userId', userById);


module.exports = router;
