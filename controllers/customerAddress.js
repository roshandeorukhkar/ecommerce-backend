const CustomerAddress = require('../models/customer/customerAddress');
const { errorHandler } = require('../helpers/dbErrorHandler');

/* Insert into db table here  */
exports.addAddress = (req, res) => {
  const addressData    =    new CustomerAddress({
    customerId       : req.body.customerId,
    address          : req.body.address,
    fname            : req.body.fname,
    lname            : req.body.lname,
    email            : req.body.email,
    mobile           : req.body.mobile,
    country          : req.body.country,
    city             : req.body.city,
    state            : req.body.state,
    pincode          : req.body.pincode
  })
  addressData.save();
  res.json(addressData);
};

//fetch data by id
exports.fetchAllAddressById= (req,res) => {
  CustomerAddress.find({customerId: req.params.id}, function (err, data) {
    res.send(data);
  })
}

//fetch all data by id
exports.fetchAddressDataById = (req, res) => { 
  CustomerAddress.findById( req.params.addressId,function (err, data){
    res.send(data);
  })
},

//delete data
exports.removeFromAddressById = (req, res) => {
  CustomerAddress.deleteOne({ _id: req.body.addressId }, (err, deleted) => {
      if (err) {
          return res.status(400).json({
              error: errorHandler(err)
          });
      }
      res.json({
          message: 'Address has been deleted successfully.'
      });
  });
};

//updated data
exports.updateAddress=(req, res, next) => {  
    CustomerAddress.findByIdAndUpdate({_id: req.params.id},{
      customerId       : req.body.customerId,
      address          : req.body.address,
      fname            : req.body.fname,
      lname            : req.body.lname,
      email            : req.body.email,
      mobile           : req.body.mobile,
      country          : req.body.country,
      city             : req.body.city,
      state            : req.body.state,
      pincode          : req.body.pincode
    },{ new: true }, function(err, data){
      if(err) {
        res.json(err);
      } 
      else { 
        res.json(data);
      }
    });
}




