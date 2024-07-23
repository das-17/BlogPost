const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: [true, 'Please provide username'], unique: true},
    password: {type: String, required: [true, 'Please provide password']}
});

UserSchema.plugin(uniqueValidator);

UserSchema.pre('save', async function(next) {
    const user = this;
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
    next();
});

const User = mongoose.model('User', UserSchema);
// This creates the plural version of the model.

module.exports = User;
 