const express = require("express");
const router = express.Router();

const {
        signIn,
        signUp,
        signout,
        read,
        list,
        remove,
        update,
        userById
    } = require("../controllers/user");
const { requireSignin, isAuth } = require("../controllers/auth");
router.post("/users/signin", signIn);
router.post("/users/signup", signUp);
router.get("/users/signout", signout);

router.get('/users/:userId', requireSignin, isAuth, read);
router.get('/users', requireSignin, isAuth, list);
router.delete("/users/:userId", requireSignin, isAuth, remove);
router.put("/users/:userId", requireSignin, isAuth, update);

router.param('userId', userById);

module.exports = router;