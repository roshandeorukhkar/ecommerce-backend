const express = require('express');
const router = express.Router();

//const { requireSignin, isAuth } = require('../controllers/auth');

//const { userById, read, update, purchaseHistory, list, reads } = require('../controllers/customer');

// router.get('/secret', requireSignin, (req, res) => {
//     res.json({
//         user: 'got here yay'
//     });
// });

//router.get('/user/:userId', requireSignin, isAuth, read);
//router.put('/user/:userId', requireSignin, isAuth, update);
//router.get('/orders/by/user/:userId', requireSignin, isAuth, purchaseHistory);

//router.get('/customer', list);

//router.get('/customer/:productId', reads);

//router.param('userId', userById);


module.exports = router;