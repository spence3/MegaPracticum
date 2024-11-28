const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
    username: {//start with 10000 root_uvu
        type: String,
        required: [true, 'username is required'],
        unique: true,
    },
    university: {
        type: String,
        required: [true, '1 for UVU 2 for UofU']
    },
    role: {
        type: String,
        required: [true, 'What is the role of user?']
    },
    first_name: {
        type: String,
        required: [true, 'What is the users first name']
    },
    last_name: {
        type: String,
        required: [true, 'What is the users last name']
    },
    password: {
        type: String,
        required: [true, 'Enter in the users password']
    }
});

// Apply the passport-local-mongoose plugin
UserSchema.plugin(passportLocalMongoose);

// Export the User model
module.exports = mongoose.model('User', UserSchema);
