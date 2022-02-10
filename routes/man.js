const express = require('express');
const router = express.Router();

const { create1, productById, read, update, remove, list } = require('../controllers/man');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.get('/man/:productId', read);

router.post('/man/create1/:userId', requireSignin, isAuth, isAdmin, create1);

router.put("/man/:productId/:userId", requireSignin, isAuth, isAdmin, update);

router.get('/man', list);
router.delete("/man/:productId/:userId", requireSignin, isAuth, isAdmin, remove);

router.param('productId', productById);
router.param('userId', userById);

module.exports = router;
