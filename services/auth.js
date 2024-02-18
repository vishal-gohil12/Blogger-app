const jwt = require('jsonwebtoken');

const secret = "@JsonWeb123";

const createToken = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
    };

    const token = jwt.sign(payload, secret);

    return token;
}

const validateToken = (token) => {
    const payload = jwt.verify(token, secret);
    return payload;
}

module.exports = {
    validateToken,
    createToken
}