const express = require("express");
const router = express.Router();
const {userById, read, list, remove, update, create } = require('../controllers/userManagement');

router.get('/userManagement/:userId', read);
router.get('/userManagement', list);
router.delete("/userManagement/:userId", remove);
router.put("/userManagement/:userId", update);
router.post('/userManagement/create', create);

router.param('userId', userById);

module.exports = router;
