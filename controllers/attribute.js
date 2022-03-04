const Attribute = require('../models/product/attribute');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.attributeById = (req, res, next, id) => {
    Attribute.findById(id)
        //.populate('category')
        .exec((err, attribute) => {
            if (err || !attribute) {
                return res.status(400).json({
                    error: 'Attribute not found'
                });
            }
            req.attribute = attribute;
            next();
        });
};

exports.read = (req, res) => {
    return res.json(req.attribute);
};

exports.updateDelete = (req, res) => {

    const attribute = req.attribute;
    attribute.deletedAt = req.body.attributeName;
    attribute.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.remove = (req, res) => {
    let attribute = req.attribute;
    attribute.remove((err, deletedAttribute) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Delet remove table'
        });
    });
};
/* Update Attribute*/
exports.update = (req, res) => {

    const attribute = req.attribute;
    attribute.attributeName = req.body.attributeName;
    attribute.description = req.body.description;
    attribute.dimension = req.body.dimension;
    attribute.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

/* Insert into db table here  */
exports.create = (req, res) => {
   //console.log(req.body)
   const attribute = new Attribute(req.body);
   attribute.save((err, data) => {
       if (err) {
           return res.status(400).json({
               error: errorHandler(err)
           });
       }
       res.json({ data });
   });
};


exports.list = (req, res) => {
        
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    
    Attribute.find()
        .sort([[sortBy, order]])
        .exec((err, attribute) => {
            if (err) {
                return res.status(400).json({
                    error: 'Attribute not found'
                });
            }
            res.json(attribute);
     
        });
};







