var express = require('express');
var router = express.Router();
const User = require('../models/in_memo/users');

/* GET users listing. */
router.route('/')
    .get((req, res, next) => {
        (async () => {
            let users = await User.getUsers();
            return {
                code: 0,
                users
            }
        })()
            .then(r => {
                res.json(r);
            })
            .catch(e => {
                next(e);
            })
    })
    .post((req, res, next) => {
        (async () => {
            let users = await User.createANewUser({
                name: req.body.name,
                age: req.body.age
            });
            return {
                code: 0,
                users
            }
        })()
            .then(r => {
                res.json(r)
            })
            .catch(e => {
                next(e);
            })
    });
router.route('/:id')
    .get((req, res, next) => {
        (async () => {
            let users = await User.getUserById(parseInt(req.params.id));
            console.log({
                code: 0,
                users
            });
            return {
                code: 0,
                users
            }
        })()
            .then(r => {
                res.json(r)
            })
            .catch(e => {
                next(e);
            })
    })
    .patch((req, res, next) => {
        (async () => {
            let users = await User.updateUserById(parseInt(req.params.id), req.body);
            return {
                code: 0,
                users
            }
        })()
            .then(r => {
                res.json(r);
            })
            .catch(e => {
                next(e);
            })
    });

module.exports = router;
