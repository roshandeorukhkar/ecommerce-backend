const express = require("express");
const router = express.Router();
const { create, productById, read, update, remove, list, updateDelete } = require('../controllers/manufacturer');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { maniValidator } = require("../validator");

router.get('/manufacturer/:productId', read);
router.get('/manufacturer', list);
router.post('/manufacturer/create', maniValidator, create);
router.delete("/manufacturer/:productId", remove);
router.put("/manufacturer/:productId", update);

router.post("/manufacturer/delete/:productId", updateDelete);


router.param('productId', productById);
//router.param('userId', userById);

module.exports = router;
