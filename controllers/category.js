const { uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const { ref } = require("@firebase/storage");

const firebase = require("./dbFirebase");
const firestore = firebase.firestore();
const storage = firebase.storage().ref();
global.XMLHttpRequest = require("xhr2");

var path = require("path");
const fs = require("fs");
const _ = require("lodash");


const Category = require('../models/category/category');
const Product = require('../models/product/product');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.uploadImg = async (req, res) => {
    console.log("testing", req.file);
    const file = req.file;
    const timestamp = Date.now();
    const name = file.originalname.split(".")[0];
    const type = file.originalname.split(".")[1];
    const fileName = `${name}_${timestamp}.${type}`;
    console.log("fileName : ", fileName);
    // Step 1. Create reference for file name in cloud storage
    const imageRef = storage.child(`/slider/${fileName}`);
    // Step 2. Upload the file in the bucket storage
    const snapshot = await imageRef.put(file.buffer);
    // Step 3. Grab the public url
    const downloadURL = await snapshot.ref.getDownloadURL();
  };
  
  exports.getTopCategories = (req, res) => {
    Category.find({navigation: 1}).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'Category does not exist1 '
            });
        }
        res.json(category);
        /* return res.status(200).json({
           // res.json(data);
            data: category
        }); */
    });
};
/*
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
*/

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
    Category.find({
        status: 1
    }).exec((err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: 'Category does not exist'
            });
        }
        req.category = category;
        next();
    });
    //return res.json(req.category);
    
};

exports.update = (req, res) => {
    console.log('req.body', req.body);
    console.log('category update param', req.params.categoryId);

    const category = req.category;
    category.name = req.body.name;
    category.description = req.body.description;
    category.navigation = req.body.navigation;
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
    Category.find({
        status: 1
    }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};


exports.subcategory = (req, res) => {
    Category.find({
        status: 1
    }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};
