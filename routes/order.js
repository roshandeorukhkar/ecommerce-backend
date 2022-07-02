const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/auth");
const { userById, addOrderToUserHistory } = require("../controllers/customer");
const { decreaseQuantity } = require("../controllers/product");
const { read, updateOrder, create, listOrders, getStatusValues, orderById, updateOrderStatus, updateDelete, getCartList, cartList, removeCartDataById, removeCartList } = require("../controllers/order");

router.post("/cart/create", cartList);
router.get("/cart/list/:userId",  getCartList);
router.delete("/cart/delete/:userId",  removeCartList);// for empty cart when we order successfully
router.delete("/cart/delete/:userId/:id", removeCartDataById);// delete cart item

router.post("/order/create/:userId", requireSignin, isAuth, addOrderToUserHistory, decreaseQuantity, create );
router.get("/order/list/:userId",listOrders);
router.get("/order/status-values/:userId", requireSignin,isAuth,getStatusValues);
router.put("/order/:orderId/status/:userId", requireSignin, isAuth, updateOrderStatus);

router.get("/order/list/", listOrders);
router.param("orderId", orderById);
router.get('/order/:orderId', read);
router.put("/order/update/:orderId", updateOrder);
router.post("/order/delete/:orderId", updateDelete);

module.exports = router;