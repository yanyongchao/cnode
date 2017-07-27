var express = require('express');
var router = express.Router();
const Topic = require('../models/in_memo/topic');
const User = require('../models/in_memo/users');

/* GET users listing. */
router.route('/')
    .get((req, res, next) => {
        (async () => {
            let topics = await Topic.getTopics();
            return {
                code: 0,
                topics
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
            const user = await User.getUserById(parseInt(req.body.userId));
            let topic = await Topic.createANewTopic({
                creator: user.name,
                title: req.body.title,
                content: req.body.content
            });
            console.log(topic);
            return {
                code: 0,
                topic
            }
        })()
            .then(r => {
                res.json(r);
            })
            .catch(e => {
                next(e);
            })
    });
router.route('/:id')
    .get((req, res, next) => {
        (async () => {
            let topic = await Topic.getTopicById(parseInt(req.params.id));
            return {
                code: 0,
                topic
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
            let topic = await Topic.updateTopicById(parseInt(req.params.id), req.body);
            console.log(topic);
            return {
                code: 0,
                topic
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