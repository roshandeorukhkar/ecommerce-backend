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

router.post("/user/signin", signIn);
router.post("/user/signup", signUp);
router.get("/user/signout", signout);

router.get('/user/:userId', read);
router.get('/user', list);
router.delete("/user/:userId", remove);
router.put("/user/:userId", update);

router.param('userId', userById);

module.exports = router;