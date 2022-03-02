const express = require("express");
const router = express.Router();
const { productById, read, list, update, updateDelete, updateStatus, updateStatusCheck, remove} = require('../controllers/cust');
const { maniValidator } = require("../validator");

router.get('/cust/:productId', read);
router.get('/cust', list);
router.put("/cust/:productId", update);
router.delete("/cust/:productId", remove);

router.post("/cust/delete/:productId", updateDelete);
router.post("/cust/status/:productId", updateStatus);
router.post("/cust/statusCheck/:productId", updateStatusCheck);



router.param('productId', productById);

module.exports = router;
