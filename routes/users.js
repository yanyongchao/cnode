const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.route('/')
  .get((req, res, next) => {
    (async () => {
      const users = await User.getUsers();
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
      });
  })
  .post((req, res, next) => {
    (async () => {
      const user = await User.createNewUser(req.body);
      if (user) {
        return {
          code: 0,
          user
        };
      }
    })()
      .then(r => {
        res.json(r);
      })
      .catch(e => {
        next(e);
      });
  });

router.route('/:id')
  .get((req, res, next) => {
    (async () => {
      const user = await User.getUserById(req.params.id);
      return {
        user,
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
      const user = await User.updateUser(req.params.id, req.body);
      return {
        user,
        code: 0
      };
    })()
      .then(r => {
        res.json(r);
      })
      .catch(e => {
        next(e);
      });
  });

module.exports = router;