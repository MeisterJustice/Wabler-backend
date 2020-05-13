require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');
const authRoutes = require('./routes/auth')
const messagesRoutes = require('./routes/messages')
const db = require('./models/index');
const { isAuthenticated, isAuthorized } = require('./middleware/auth')

const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())


// all my routes
app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages', messagesRoutes);

app.get('/api/messages', isAuthenticated, async (req, res, next) => {
    try {
        let messages = await db.Message.find().sort({ createdAt: 'desc' }).populate('user', {
            username: true,
            profileImageUrl: true
        });
        return res.status(200).json(messages);
    } catch (err) {
        return next(err);
    }
})


// but if non of those routes are reached
app.use(function (req, res, next) {
    let err = new Error('NOT FOUND');
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server is starting on port ${PORT}`)
})