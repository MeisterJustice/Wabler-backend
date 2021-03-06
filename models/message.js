const mongoose = require('mongoose');
const User = require('./user');

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxlength: 160,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
}, {
    timestamps: true
});

messageSchema.pre('remove', async function (next) {
    try {
        let user = await User.findById(this.user);
        // remove message in user model array
        user.messages.remove(this.id);
        // save that user
        await user.save()
    } catch (err) {
        return next(err);
    }
})

const message = mongoose.model('Message', messageSchema);
module.exports = message;