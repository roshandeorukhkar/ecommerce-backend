const express = require('express');
const router = express.Router();
const { 
    addAddress, 
    fetchAllAddressById, 
    removeFromAddressById, 
    fetchAddressDataById, 
    updateAddress
} = require('../controllers/customerAddress');
const { requireSignin, isAuth } = require('../controllers/auth');

router.post("/customeraddress/add", addAddress);
router.get("/customeraddress/read/:id", fetchAllAddressById);
router.get("/customeraddress/readdata/:addressId", fetchAddressDataById);
router.post("/customeraddress/update/:id", updateAddress);
router.delete("/customeraddress/delete/:addressId", removeFromAddressById);

module.exports = router;