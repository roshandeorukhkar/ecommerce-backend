const Users = require('../../models/user');
const { getUserRoleById } = require("../users/userRoles")
const jwt = require('jsonwebtoken'); // to generate signed token

//using async/await
exports.getModuleAccess = async (req, res) => {
    const { userRole } = new Users(req.body);
    console.log(userRole)
    const roles = await getUserRoleById(userRole);
    console.log("roles---",roles)
};
