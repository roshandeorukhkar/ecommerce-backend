const CustomerAddress = require('../models/customer/customerAddress');
const { errorHandler } = require('../helpers/dbErrorHandler');

/* Insert into db table here  */
exports.addAddress = (req, res) => {
    console.log("req-----",req)
   const addressData    =    new CustomerAddress({
    customerId       : req.body.customerId,
    address          : req.body.address,
    country          : req.body.country,
    city             : req.body.city,
    state            : req.body.state,
    pincode          : req.body.pincode
  })
  addressData.save();
  console.log("addressData",addressData)
  res.json(addressData);
};








