const express = require("express");
const router = express.Router();

const { requireSignin, isAuth } = require("../controllers/auth");
const { read, updateOrder, create, listOrders, updateDelete } = require("../controllers/wishlist");

router.post("/wishlist/create/:userId", create);

// router.get("/wishlist/list/", listOrders);
// router.param("wishlistId", orderById);
// router.get('/wishlist/:orderId', read);
// router.put("/wishlist/update/:orderId", updateOrder);
// router.post("/wishlist/delete/:orderId", updateDelete);

module.exports = router;
