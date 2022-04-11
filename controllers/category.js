const Category = require('../models/category/category');
const Product = require('../models/product/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'Category does not exist'
            });
        }
        req.category = category;
        next();
    });
};

exports.create = (req, res) => {
    console.log(req.body)
    const category = new Category(req.body);
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({ data });
    });
};

exports.read = (req, res) => {
    return res.json(req.category);
};

exports.update = (req, res) => {
    console.log('req.body', req.body);
    console.log('category update param', req.params.categoryId);

    const category = req.category;
    category.name = req.body.name;
    category.description = req.body.description;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
exports.remove1 = (req, res) => {
    const categoryId = req.params.categoryId;
    const subcategory = req.subcategory;
    //subcategory.subcategory = req.Category;

   // console.log(Category,"pppppp,,,,,,")
    Category.findByIdAndDelete(categoryId, subcategory, function(err, data){
        if (err){
            console.log(err)
        }
        else{
            res.json({
                message: 'Category deleted...'
            });
        }
    })
};
exports.remove = (req, res) => {
    const categoryId = req.params.categoryId;
    Category.findByIdAndDelete(categoryId, function(err, data){
        if (err){
            console.log(err)
        }
        else{
            res.json({
                message: 'Category deleted'
            });
        }
    })
};

exports.updateStatus = (req, res) => {
    const category = req.category;
    category.status = req.body.name;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.updateDelete = (req, res) => {
    const category = req.category;
    category.deletedAt = req.body.manufacturerName;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.changeStatus = (req, res) => {
    console.log("==========",req.category)
    const category = req.category;
    category.status = req.body.name;
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};


exports.list = (req, res) => {
    Category.find().exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
