
const Manufacturer = require('../models/customer');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.productById = (req, res, next, id) => {
   Manufacturer.findById(id)
       //.populate('category')
       .exec((err, manufacturer) => {
           if (err || !manufacturer) {
               return res.status(400).json({
                   error: 'manufacturer not found'
               });
           }
           req.manufacturer = manufacturer;
           next();
       });
};

/* insert into db table here  */
exports.create = (req, res) => {
   console.log(req.body)
   const manufacturer = new Manufacturer(req.body);
   manufacturer.save((err, data) => {
       if (err) {
           return res.status(400).json({
               error: errorHandler(err)
           });
       }
       res.json({ data });
   });
};


exports.read = (req, res) => {
   return res.json(req.manufacturer);
};

exports.update = (req, res) => {

   const manufacturer = req.manufacturer;
   manufacturer.name = req.body.name;
   manufacturer.email = req.body.email;
   manufacturer.save((err, data) => {
       if (err) {
           return res.status(400).json({
               error: errorHandler(err)
           });
       }
       res.json(data);
   });
};

exports.updateDelete = (req, res) => {

   const manufacturer = req.manufacturer;
   manufacturer.deletedAt = req.body.manufacturerName;
   manufacturer.save((err, data) => {
       if (err) {
           return res.status(400).json({
               error: errorHandler(err)
           });
       }
       res.json(data);
   });
};


exports.remove = (req, res) => {
   let manufacturer = req.manufacturer;
   manufacturer.remove((err, deletedManf) => {
       if (err) {
           return res.status(400).json({
               error: errorHandler(err)
           });
       }
       res.json({
           message: 'Delet Manifactuer table'
       });
   });
};

exports.list = (req, res) => {
       
   let order = req.query.order ? req.query.order : 'asc';
   let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
   let limit = req.query.limit ? parseInt(req.query.limit) : 6;

   Manufacturer.find()
       .select('-photo')
       .populate('category')
       .sort([[sortBy, order]])
       .limit(limit)
       .exec((err, manufacturer) => {
           if (err) {
               return res.status(400).json({
                   error: 'manufacturer not found'
               });
           }
           res.json(manufacturer);
       });
};