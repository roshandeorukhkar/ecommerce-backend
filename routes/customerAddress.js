const express = require('express');
const router = express.Router();


const { addAddress } = require('../controllers/customerAddress');


router.post('/customeraddress/add', addAddress);


module.exports = router;