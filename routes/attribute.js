const express = require("express");
const router = express.Router();

const { read,create,attributeById,list,update,updateStatus ,changeStatus ,remove,updateDelete} = require('../controllers/attribute');
//const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
//const { userById } = require('../controllers/user');
const { attributeValidator } = require("../validator");


router.get('/attribute/:attributeId', read);
router.post('/attribute/create',attributeValidator, create);
router.get('/attribute', list);
router.post("/attribute/status/:attributeId", updateStatus);
router.post("/attribute/statusChange/:attributeId", changeStatus);
router.put("/attribute/:attributeId", attributeValidator, update);
router.delete("/attribute/:attributeId", remove);
router.post("/attribute/delete/:attributeId", updateDelete);


router.param('attributeId', attributeById);





module.exports = router;
