const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/auth");
const { userById, addOrderToUserHistory } = require("../controllers/customer");
const { decreaseQuantity } = require("../controllers/product");
const { read, updateOrder, create, listOrders, getStatusValues, orderById, updateOrderStatus, updateDelete } = require("../controllers/order");

router.post("/order/create/:userId", requireSignin, isAuth, addOrderToUserHistory, decreaseQuantity, create );
// router.get("/order/list/:userId", requireSignin, isAuth, listOrders);
// router.get("/order/status-values/:userId", requireSignin,isAuth,getStatusValues);
// router.put("/order/:orderId/status/:userId", requireSignin, isAuth, updateOrderStatus);
// router.param("userId", userById);
// router.param("orderId", orderById);
// old route is commited

router.get("/order/list/", listOrders);
router.param("orderId", orderById);
router.get('/order/:orderId', read);
router.put("/order/update/:orderId", updateOrder);
router.post("/order/delete/:orderId", updateDelete);

module.exports = router;
