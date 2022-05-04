const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');
const Product = require('../models/product/product');
const { errorHandler } = require('../helpers/dbErrorHandler');
const { uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const { ref } = require("@firebase/storage");

const firebase = require("./dbFirebase");
const firestore = firebase.firestore();
const storage = firebase.storage().ref();
global.XMLHttpRequest = require("xhr2");

var path = require("path");
const firebaseImgUpload = require("./firebaseImgUpload");
const mongoose = require("mongoose");
const Category = require("../models/category/category")
const Specification = require("../models/product/specification");

// exports.productById_ = (req, res, next, id) => {
//     Product.findById(id)
//         .populate('category')
//         .exec((err, product) => {
//             console.log("error",err)
//             if (err || !product) {
//                 return res.status(400).json({
//                     error: 'Product not found'
//                 });
//             }
//             req.product = product;
//             next();
//         });
// };

exports.productById = async (req, res, next, id) => {
    try{
        let matchObj = {};
        matchObj["_id"] = mongoose.Types.ObjectId(id)

        const productData =  await Product.aggregate([
            {
                $match : {
                    ...matchObj
                }
            },
            {
                $lookup : {
                from : Category.collection.name,
                localField : "category",
                foreignField : "_id",
                as: "category"
                },
            },
               { 
                $lookup : {
                from : Specification.collection.name,
                localField : "specification",
                foreignField: "_id",
                as : "specification"
                }
            },
        ]);  
        req.product = productData[0];
        next();
    }catch(e){
        console.log("error",e);
        return res.status(400).json({
            error: 'Product not found'
        })
    }
}

exports.read = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};

// exports.create = (req, res) => {
// //console.log(req)    
//     let form = new formidable.IncomingForm();
//     form.keepExtensions = true;
//     form.parse(req, (err, fields, files) => {
//         if (err) {
//             return res.status(400).json({
//                 error: 'Image could not be uploaded'
//             });
//         }
//     //     // check for all fields
//         const { name} = fields;

//         if (!name ) {
//             return res.status(400).json({
//                 error: 'All fields are required'
//             });
//         }

//          let product = new Product(fields);

//     //     // 1kb = 1000
//     //     // 1mb = 1000000

//         if (files.photo) {
//             // console.log("FILES PHOTO: ", files.photo);
//             if (files.photo.size > 100000000){
//                 return res.status(400).json({
//                     error: 'Image should be less than 10mb in size'
//                 });
//             }
//             product.photo.data = fs.readFileSync(files.photo.path);
//             product.photo.contentType = files.photo.type;
//         }

//         product.save((err, result) => {
//             if (err) {
//                 console.log('PRODUCT CREATE ERROR ', err);
//                 return res.status(400).json({
//                     error: errorHandler(err)
//                 });
//             }
//             res.json(result);
//         });
//     });
// };

function getFileList(directory, extension) {
    console.log("directory" ,directory )
    let dir = fs.readdirSync(directory);
    let filelist = dir.filter( elm => elm.match(new RegExp(`.*\.(${extension})`, 'ig')));
    return filelist.map(file => {
      return {
        filename: file,
        content: fs.readFileSync(path.join(directory, file)).toString()
      }
    });
  }

exports.create = async (req, res) => {
    try{
        if(req.files){
        let k = 0;
        let imageArray = {};
        for(let i = 0; i <= req.body.imgLength ; i++){
            let imgColorArray = [];
            for( j = 0 ; j <= req.body[`colorImgLength${i}`] ; j++ ){
            if( k < req.files.length){
                const file = req.files[k];
                const timeStamp = Date.now();
                const name =  file.originalname.split(".")[0];
                const type =  file.originalname.split(".")[1];
                const fileName = `${name}_${timeStamp}.${type}`;
                const imageRef = storage.child(`/product/${fileName}`);
                const snapshot = await imageRef.put(file.buffer);
                const downloadURL = await snapshot.ref.getDownloadURL();
                var colorName = req.body[`color${i}`];
                imgColorArray.push(downloadURL);
                k++;
                console.log("red ",colorName);
                imageArray[colorName] = imgColorArray;
            }
        }
    }
    const attribute  = JSON.parse(req.body.attribute);
    const specification = JSON.parse(req.body.specification);
    const productData =new Product({
        attribute :attribute, 
        brand : req.body.brand,
        category :req.body.category, 
        subcategory :req.body.subcategory, 
        description :req.body.description, 
        discount:req.body.discount,
        manufactures :req.body.manufactures,
        name :req.body.name,
        price :req.body.price, 
        quantity :req.body.quantity, 
        shipping :req.body.shipping, 
        specification :specification, 
        type : req.body.type,
        images: imageArray,
    });
    const result = await productData.save();
        return res.json({
            data : result,
            status : true
        })
    }
    }catch(err){
        return res.status(400).json({
            error: errorHandler(err),
            status : false
        });
    }
}

exports.remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Product deleted successfully'
        });
    });
};

exports.update = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: 'Image could not be uploaded'
            });
        }

        let product = req.product;
        product = _.extend(product, fields);

          // 1kb = 1000
        // 1mb = 1000000

        if (files.photo) {
            // console.log("FILES PHOTO: ", files.photo);
            if (files.photo.size > 10000) {
                return res.status(400).json({
                    error: 'Image should be less than 1mb in size'
                });
            }
            product.photo.data = fs.readFileSync(files.photo.path);
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(result);
        });
    });
};

/**
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

exports.list = (req, res) => {
    let order = req.query.order ? req.query.order : 'asc';
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    Product.find()
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json(products);
        });
};

/**
 * it will find the products based on the req product category
 * other products that has the same category, will be returned
 */

exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find({ _id: { $ne: req.product }, category: req.product.category })
        .limit(limit)
        .populate('category', '_id name')
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json(products);
        });
};

exports.listCategories = (req, res) => {
    Product.distinct('category', {}, (err, categories) => {
        if (err) {
            return res.status(400).json({
                error: 'Categories not found'
            });
        }
        res.json(categories);
    });
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : 'desc';
    let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};

    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'price') {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    Product.find(findArgs)
        .select('-photo')
        .populate('category')
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: 'Products not found'
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};

exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set('Content-Type', req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

exports.listSearch = (req, res) => {
    // create query object to hold search value and category value
    const query = {};
    // assign search value to query.name
    if (req.query.search) {
        query.name = { $regex: req.query.search, $options: 'i' };
        // assigne category value to query.category
        if (req.query.category && req.query.category != 'All') {
            query.category = req.query.category;
        }
        // find the product based on query object with 2 properties
        // search and category
        Product.find(query, (err, products) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            res.json(products);
        }).select('-photo');
    }
};

exports.decreaseQuantity = (req, res, next) => {
    let bulkOps = req.body.order.products.map(item => {
        return {
            updateOne: {
                filter: { _id: item.id },
                update: { $inc: { quantity: -item.quantity, sold: +item.quantity } }
            }
        };
    });

    Product.bulkWrite(bulkOps, {}, (error, products) => {
        if (error) {
            return res.status(400).json({
                error: 'Could not update product'
            });
        }
        next();
    });
};

exports.updateStatus = (req, res) => {
    const products = req.product;
    products.status = req.body.statusVlaue;
    products.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.changeStatus = (req, res) => {
    const products = req.product;
    products.status = req.body.statusVlaue;
    products.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.changeStatusDelete = (req, res) => {
    const products = req.product;
    products.deletedAt = req.body.statusVlaue;
    products.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
                
            });
        }
        res.json(data);
    });
};


