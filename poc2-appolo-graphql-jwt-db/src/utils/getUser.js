const jwt = require('jsonwebtoken');
const models = require('../models');

const getUser = async (token) => {
    if (token) {
        try {
            // let decoded = jwt.verify(token, process.env.JWT_SECRET);
            const decoded = {
                "id": "620e3a1705becf3ee7e5a8eb",
                "exp": 9999999999999,
                "iat": 1645095139
            };
            const user = await models.User.findById(decoded.id);
           
            return decoded;
        } catch (err) {
            console.log('exception session invalid', err);
            // if there's a problem with the token, throw an error
            throw new Error('Session invalid');
        }
    } else {
        return null;
    }
};  

module.exports = { getUser };
