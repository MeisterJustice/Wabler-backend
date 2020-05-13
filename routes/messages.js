const express = require('express');
const router = express.Router({ mergeParams: true });
const { createMessage, getMessage, deleteMessage, putMessage } = require('../handlers/messages');
const { isAuthenticated, isAuthorized, } = require('../middleware/auth')

router
    .route('/').post(createMessage);

router
    .route('/:message_id')
    .get(getMessage)
    .put(isAuthenticated, isAuthorized, putMessage)
    .delete(isAuthenticated, isAuthorized, deleteMessage)

module.exports = router;