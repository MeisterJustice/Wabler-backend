const express = require('express');
const router = express.Router();
const { signup, signin, putUser } = require('../handlers/auth');
const { isAuthenticated, isAuthorized } = require('../middleware/auth');

router.post('/signup', signup);

router.post('/signin', signin);

router.put('/:id/users', isAuthenticated, isAuthorized, putUser)

module.exports = router;