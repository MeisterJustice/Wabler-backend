const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');

const PORT = 8081;

app.use(cors());
app.use(bodyParser.json());

// all my routes


// but if non of those routes are reached
app.use(function(req, res, next) {
    let err = new Error('NOT FOUND');
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`server is starting on port ${PORT}`)
})