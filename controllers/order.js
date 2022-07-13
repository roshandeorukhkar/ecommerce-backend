const { Order, CartItem } = require('../models/order'); 
const  CustomerAddress  = require('../models/customer/customerAddress')
const products = require('../models/product/product');
const { errorHandler } = require('../helpers/dbErrorHandler');
// sendgrid for email npm i @sendgrid/mail
const { ObjectId } = require('mongodb');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

exports.cartList = (req, res) => {
    const cartData    =    new CartItem({
      user        : req.body.user,
      product     : req.body.product,
      quantity    : req.body.quantity,
    })
    cartData.save();
    res.json(cartData);
};

//fetch data by id
exports.getCartList= async(req,res) => {
    const cartData =  await CartItem.aggregate([
        {
            $match : {
            user: ObjectId(req.params.userId)
            }
        },
        {
            $lookup : {
            from : 'products',
            localField : "product",
            foreignField : "_id",
            as: "productDetails"
            },
        }
    ]);
    return res.json(cartData);
}

//delete data
exports.removeCartDataById = (req, res) => {
    CartItem.deleteOne({userId:req.params.userId, _id: req.params.id }, (err, deleted) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'Item has been deleted successfully.'
        });
    });
  };

//remove cart item in cart list..........working on
exports.removeCartList = (req, res) => {
    CartItem.remove({userId:req.params.userId}, (err, deleted) => {``
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json({
            message: 'cart is empty.'
        });
    });
};
exports.orderById = (req, res, next, id) => {
    Order.findById(id)
        .populate('products.product', 'name price')
        .exec((err, order) => {
            if (err || !order) {
                return res.status(400).json({
                    error: errorHandler(err)
                });
            }
            req.order = order;
            next();
        });
};

exports.read = (req, res) => {
    return res.json(req.order);
};

exports.create = (req, res) => {
    req.body.order.user = req.params.userId;
    const order = new Order(req.body.order);
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        res.json(data);
    });
};

exports.listOrders = async (req, res) => {
    const orderData = await Order.aggregate([
        {
            $match : {
                user: ObjectId(req.params.userId)
            }
        },
        { 
            $lookup : {
                from : products.collection.name,
                localField : "products.product",
                foreignField : "_id",
                as: "productData"
            }
        },
        { 
            $lookup : {
                from: CustomerAddress.collection.name,
                localField : "addressId",
                foreignField : "_id",
                as: "adrressData"
            }
        }  
    ]);
    return res.json(orderData);
};

exports.updateDelete = (req, res) => {
    const order = req.order;
    order.deletedAt = req.body.deletedAt;
    order.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.getStatusValues = (req, res) => {
    res.json(Order.schema.path('status').enumValues);
};

/* Update order*/
exports.updateOrder = (req, res) => {
    const order = req.order;
    order.status = req.body.status;
    order.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(data);
    });
};

exports.updateOrderStatus = (req, res) => {
    Order.updateOne({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(order);
    });
};
