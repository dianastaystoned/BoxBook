const helpers = {};
const bcrypt = require('bcryptjs');

helpers.encryptPassword = async (contrasenia) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(contrasenia, salt);
    return hash;
};

helpers.matchPassword = async (contrasenia, savedContrasenia) => {
    try {
        return await bcrypt.compare(contrasenia, savedContrasenia);
    } catch (e) {
        console.log(e);
    }
};

module.exports = helpers;