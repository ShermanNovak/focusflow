import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    themeColour: {
        type: String,
    }
}, { timestamps: true })

userSchema.statics.signup = async function(username, email, password) {
    if (!email || !password || !username) {
        throw new Error('All fields must be filled!')
    }
    if (!validator.isEmail(email)) {
        throw new Error('Invalid Email!'); 
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error('Password must have at least 8 characters long, 1 uppercase and 1 lowercase letter, and 1 number and 1 symbol');
    }

    const exists = await this.findOne({ email })
    if (exists) {
        throw new Error('This email is already in use!');
    }

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ username, email, password: hash, themeColour: "bg-navbar-green"})

    return user;
}

userSchema.statics.login = async function(email, password) {
    if (!email || !password) {
        throw new Error('All fields must be filled!')
    }
    if (!validator.isEmail(email)) {
        throw new Error('Invalid Email!'); 
    }

    const user = await this.findOne({ email })
    if (!user) {
        throw new Error('Incorrect email');
    }

    const match = await bcrypt.compare(password, user.password); 
    if (!match) {
        throw new Error('Incorrect password'); 
    }

    return user;
}

module.exports = mongoose.model('User', userSchema)
