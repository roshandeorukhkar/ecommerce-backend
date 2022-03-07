const Users = require('../../models/user');
const Modules = require('../../models/modules');
const { getUserRoleById } = require("../users/userRoles")
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

async function getModuleAccess(userId) {
    let userData = []
    const user = await Users.findOne({_id: userId});
    const roles = await getUserRoleById(user.userRole);
    console.log("roles", roles)
    const modulesArray =  roles.modules.map(v => mongoose.Types.ObjectId(v))

    const modules = await Modules.find({'_id': { $in: modulesArray }});
    return {user, roles, modules}
}
module.exports = {
    getModuleAccess
};
