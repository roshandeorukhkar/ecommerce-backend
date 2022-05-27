const { Order, CartItem } = require('../models/order');
const { errorHandler } = require('../helpers/dbErrorHandler');
// sendgrid for email npm i @sendgrid/mail
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

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
    console.log("I am in order create-----")
    req.body.order.user = req.params.userId;
    const order = new Order(req.body.order);
    order.save((error, data) => {
        if (error) {
            return res.status(400).json({
                error: errorHandler(error)
            });
        }
        // send email alert to admin
        // order.address
        // order.products.length
        // order.amount
        // const emailData = {
        //     to: 'kaloraat@gmail.com',
        //     from: 'noreply@ecommerce.com',
        //     subject: `A new order is received`,
        //     html: `
        //     <p>Customer name:</p>
        //     <p>Total products: ${order.products.length}</p>
        //     <p>Total cost: ${order.amount}</p>
        //     <p>Login to dashboard to the order in detail.</p>
        // `
        // };
        // sgMail.send(emailData);
        res.json(data);
    });
};

exports.listOrders = (req, res) => {
    /* try{
        const orders =  await Order.aggregate([
            {
                $lookup : {
                from : Category.collection.name,
                localField : "category",
                foreignField : "_id",
                as: "category"
                },
            }
        ]);
    }catch(e){
        console.log("error",e);
        return res.status(400).json({
            error: 'Orders not found'
        })
    } */
    Order.find()
        // .populate('user', '_id name address')
        // .sort('-created')
        // old
        .populate('user')
        .exec((err, orders) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(error)
                });
            }
            res.json(orders);
        });
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
    Order.update({ _id: req.body.orderId }, { $set: { status: req.body.status } }, (err, order) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }
        res.json(order);
    });
};
