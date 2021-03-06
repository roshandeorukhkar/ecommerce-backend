
//const Manufacturer = require('../models/customer');
const Customer = require('../models/customer/customer');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.productById = (req, res, next, id) => {
    Customer.findById(id)
       .exec((err, customer) => {
           if (err || !customer) {
               return res.status(400).json({
                   error: 'customer not found'
               });
           }
           req.customer = customer;
           next();
       });

};

/* insert into db table here  */
exports.create = (req, res) => {
   //console.log(req.body)
   const customer = new Customer(req.body);
   customer.save((err, data) => {
       if (err) {
           return res.status(400).json({
               error: errorHandler(err)
           });
       }
       res.json({ data });
   });
};


exports.read = (req, res) => {
   return res.json(req.customer);
};

exports.update = (req, res) => {

   const customer = req.customer;
   customer.name = req.body.name;
   customer.email = req.body.email;
   customer.save((err, data) => {
       if (err) {
           return res.status(400).json({
               error: errorHandler(err)
           });
       }
       res.json(data);
   });
};

exports.updateDelete = (req, res) => {

   const customer = req.customer;
   customer.deletedAt = req.body.name;
   customer.save((err, data) => {
       if (err) {
           return res.status(400).json({
               error: errorHandler(err)
           });
       }
       res.json(data);
   });
};

exports.updateStatus = (req, res) => {

    const customer = req.customer;
    customer.status = req.body.statusV;
    customer.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
 };

 exports.updateStatusCheck = (req, res) => {

    const customer = req.customer;
    customer.status = req.body.status;
    customer.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
 };


exports.remove = (req, res) => {
   let customer = req.customer;
   customer.remove((err, deletedManf) => {
       if (err) {
           return res.status(400).json({
               error: errorHandler(err)
           });
       }
       res.json({
           message: 'Delet customer table'
       });
   });
};

exports.list = (req, res) => {
       
   let order = req.query.order ? req.query.order : 'asc';
   let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
   Customer.find()
       .sort([[sortBy, order]])
       .exec((err, customer) => {
           console.log(err)
           if (err) {
               return res.status(400).json({
                   error: 'customer not found'
               });
           }
           res.json(customer);
       });
};