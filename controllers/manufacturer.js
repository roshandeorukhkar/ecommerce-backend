// const Category = require('../models/category');
// const Pay = require('../models/pay');
const Manufacturer = require('../models/product/manufacturer');
// const Product = require('../models/product');
// const { errorHandler } = require('../helpers/dbErrorHandler');


exports.productById = (req, res, next, id) => {
    Manufacturer.findById(id)
        .populate('category')
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: 'Product not found'
                });
            }
            req.product = product;
            next();
        });
};

/* insert into db table here  */
exports.create = (req, res) => {
    console.log(req.body)
    const product = new Manufacturer(req.body);
   // let product = req.product;
    product.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};

exports.read = (req, res) => {
    return res.json(req.product);
};

// exports.update = (req, res) => {
//     // console.log('req.body', req.body);
//     // console.log('category update param', req.params.categoryId);

//     const product = req.product;
//     product.name = req.body.name;
//     product.save((err, data) => {
//         if (err) {
//             return res.status(400).json({
//                 error: errorHandler(err)
//             });
//         }
//         res.json(data);
//     });
// };

exports.update = (req, res) => {
    let product = req.product;
    product.save((err, result) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Update Manifactuer table'
        });
    });
};

exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedManf) => {
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
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json(products);
        });
};