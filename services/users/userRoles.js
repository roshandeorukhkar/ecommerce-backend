const UserRole = require('../../models/userRole');

async function getUserRoleById(userRole) {
    return await UserRole.findOne({_id: userRole})
}
module.exports = {
    getUserRoleById
};