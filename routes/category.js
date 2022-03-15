const express = require('express');
const router = express.Router();

const { create, remove, remove1, categoryById, read, updateStatus,changeStatus, update, list } = require('../controllers/category');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/customer');

router.get('/category/:categoryId', read);
//router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
//router.post('/category/create/:userId', requireSignin, isAuth, create);
router.post('/category/create', create);
router.delete("/category/:categoryId", remove);
router.delete("/categorys/:categoryId", remove1);
router.post("/category/status/:categoryId", updateStatus);
router.post("/category/statusChange/:categoryId", changeStatus);

router.put('/category/:categoryId', update);
//router.put('/category/:categoryId/:userId', requireSignin, isAuth, update);
//router.delete("/category/:categoryId", remove);
//router.delete('/category/:categoryId/:userId', requireSignin, isAuth, remove);
router.get('/categories', list);

router.param('categoryId', categoryById);
router.param('userId', userById);

module.exports = router;
