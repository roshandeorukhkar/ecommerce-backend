const express = require('express');
const router = express.Router();

const { create,remove, categoryById, read, update, list } = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/customer');

router.get('/category/:categoryId', read);
//router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
//router.post('/category/create/:userId', requireSignin, isAuth, create);
router.post('/category/create', create);
router.delete("/category/:categoryId", remove);

// router.put('/category/:categoryUpdateId/:userId', requireSignin, isAuth, isAdmin, update);
//router.put('/category/:categoryId/:userId', requireSignin, isAuth, update);
//router.delete("/category/:categoryId", remove);
//router.delete('/category/:categoryId/:userId', requireSignin, isAuth, remove);
router.get('/categories', list);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;
