const User = require('../models/mongo/users');
const JWT = require('jsonwebtoken');

module.exports = function (options) {
    return function (req, res, next) {
        console.log(req.get('Authorization'));
        const auth = req.get('Authorization').split(' ');
        if (!auth || auth.length < 2) {
            res.statusCode = 401;
            next(new Error('no auth!'));
            return;
        }
       const token = auth[1];
        try {
            const obj = JWT.verify(token, 'yanyongchao');
            console.log(obj);
            if (!obj || !obj.userId || !obj.expire) throw new Error('no auth');
            if (obj.expire < Date.now()) throw new Error('token guo qi');
            next();
        }catch (e) {
            next(e);
        }
    };
};