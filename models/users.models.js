const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = mongoose.Schema(
    {
        user_Id: {
            type: String,
            required: [true, 'user id is required'],
            unique: true,
        },
        university_Id: {
            type: String,
            required: [true, 'Must enter university ID']
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
    },
    {timestamps: true}
)



userSchema.plugin(passportLocalMongoose)
const Users = mongoose.model('User', userSchema)
module.exports = Users