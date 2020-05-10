const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/wabler', {
    keepAlive: true,
    useMongoClient: true,
});

