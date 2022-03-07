const express = require("express");
const router = express.Router();
const { productById, read, list, update, updateDelete, updateStatus, updateStatusCheck, remove} = require('../controllers/cust');
const { maniValidator } = require("../validator");

router.get('/customer/:productId', read);
router.get('/customer', list);
router.put("/customer/:productId", update);
router.delete("/customer/:productId", remove);

router.post("/customer/delete/:productId", updateDelete);
router.post("/customer/status/:productId", updateStatus);
router.post("/customer/statusCheck/:productId", updateStatusCheck);



router.param('productId', productById);

module.exports = router;
