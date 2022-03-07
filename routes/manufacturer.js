const express = require("express");
const router = express.Router();
const { create, manufacturerById, read, update, remove, list, updateDelete, updateStatus, changeStatus } = require('../controllers/manufacturer');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const { maniValidator } = require("../validator");

router.get('/manufacturer/:manufacturerId', read);
router.get('/manufacturer', list);
router.post('/manufacturer/create', maniValidator, create);
router.delete("/manufacturer/:manufacturerId", remove);
router.put("/manufacturer/:manufacturerId", maniValidator, update);


router.post("/manufacturer/delete/:manufacturerId", updateDelete);

router.post("/manufacturer/status/:manufacturerId", updateStatus);

router.post("/manufacturer/statusChange/:manufacturerId", changeStatus);


router.param('manufacturerId', manufacturerById);
//router.param('userId', userById);

module.exports = router;
