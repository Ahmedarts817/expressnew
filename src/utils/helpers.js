const bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10)
function hashPassword(password) {
    return bcrypt.hashSync(password,salt);
}
function comparePassword(password,passwordDb) {
    return bcrypt.compareSync(password,passwordDb);
}

module.exports = {hashPassword, comparePassword}