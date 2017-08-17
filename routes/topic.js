var express = require('express');
var router = express.Router();
const Topic = require('../models/topic');
const User = require('../models/user');

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
      const user = await User.getUserById(req.body.userId);
      const topic = await Topic.createTopic({
        creator: JSON.stringify(user.phoneNumber),
        title: req.body.title,
        content: req.body.content,
        time: req.body.time
      })
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
      const topic = await Topic.findTopicById(req.params.id);
      return {
        topic,
        code: 0
      }
    })()
      .then(r => {
        res.json(r);
      })
      .catch(e => {
        next(e);
      });
  })
  .patch((req, res, next) => {
    (async () => {
      const topic = await Topic.updateTopic(req.params.id, req.body);
      return {
        topic,
        code: 0
      }
    })()
      .then(r => {
        res.json(r);
      })
      .catch(e => {
        next(e);
      });
  })

module.exports = router;