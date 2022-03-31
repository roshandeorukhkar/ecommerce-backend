// const Store = require('../models/store/store');
const { errorHandler } = require('../helpers/dbErrorHandler');
const Users = require("../models/store/storeUser");

exports.userById = (req, res, next, id) => {
    Users.findById(id).populate('storeId').exec((err, user) => {
   // Store.findById(id).exec((err, user) => {
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
   const user = new Users(req.body);
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
   user.name = req.body.name;
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

exports.updateStatus = (req, res) => {
    const user = req.user;
    user.status = req.body.name;
    user.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.changeStatus = (req, res) => {
    const user = req.user;
    user.status = req.body.name;
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
                
    
    Users.find().sort([[sortBy, order]]).populate('storeId').exec((err, user) => {
            if (err) {
                return res.status(400).json({
                    error: 'user not found'
                });
            }
            res.json(user);
     
        });
 };



