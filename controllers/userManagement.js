const User = require('../models/store/store');
const { errorHandler } = require('../helpers/dbErrorHandler');


exports.userById = (req, res, next, id) => {
    User.findById(id)
       .exec((err, user) => {
           if (err || !user) {
               return res.status(400).json({
                   error: 'user not found'
               });
           }
           req.user = user;
           next();
       });
};

/* insert into db table here  */
exports.create = (req, res) => {
   console.log(req.body)
   const user = new User(req.body);
   user.save((err, data) => {
       if (err) {
           return res.status(400).json({
               error: errorHandler(err)
           });
       }
       res.json({ data });
   });
};


exports.read = (req, res) => {
   return res.json(req.user);
};

exports.update = (req, res) => {

   const user = req.user;
   user.ownerName = req.body.ownerName;
   user.email = req.body.email;
   user.address = req.body.address;
   user.save((err, data) => {
       if (err) {
           return res.status(400).json({
               error: errorHandler(err)
           });
       }
       res.json(data);
   });
};

exports.updateDelete = (req, res) => {
   const user = req.user;
   user.deletedAt = req.body.manufacturerName;
   user.save((err, data) => {
       if (err) {
           return res.status(400).json({
               error: errorHandler(err)
           });
       }
       res.json(data);
   });
};


exports.remove = (req, res) => {
   let user = req.user;
   user.remove((err, deleted) => {
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
   
   User.find()
       .sort([[sortBy, order]])
       .exec((err, user) => {
           if (err) {
               return res.status(400).json({
                   error: 'user not found'
               });
           }
           res.json(user);
    
       });
};

