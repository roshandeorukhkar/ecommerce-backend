const express = require("express");
const router = express.Router();
const { productById, read, list, update} = require('../controllers/cust');
const { maniValidator } = require("../validator");

router.get('/cust/:productId', read);
router.get('/cust', list);

 router.put("/cust/:productId", update);

// router.post("/manufacturer/delete/:productId", updateDelete);


router.param('productId', productById);

module.exports = router;
