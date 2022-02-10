const express = require("express");
const router = express.Router();

const {
    usersignin
    } = require("../controllers/user");

router.post("/usersignin", usersignin);

const {
    addUserRole
    } = require("../controllers/user");

router.post("/addUserRole", addUserRole);

module.exports = router;