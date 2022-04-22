const express = require("express");
const router = express.Router();
const multer = require("multer");
// var _config  = require("./config");
// var upload   = multer({ dest: _config.tempDir })


const { create, productById, read, remove, update, list, listRelated, listCategories, listBySearch, photo, listSearch } = require("../controllers/product");
const { requireSignin, isAuth } = require("../controllers/auth");
const { userById } = require("../controllers/customer");
const { productValidator } = require("../validator");

const storage = multer.memoryStorage();

let upload = multer({ storage: storage}).any();

router.get("/product/:productId", read);
router.post("/product/create/",upload, create);
router.delete("/product/:productId/", remove );
router.put( "/product/:productId/", update);

router.get("/products", list);
router.get("/products/search", listSearch);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);
router.post("/products/by/search", listBySearch);
router.get("/product/photo/:productId", photo);

router.param("userId", userById);
router.param("productId", productById);

module.exports = router;
