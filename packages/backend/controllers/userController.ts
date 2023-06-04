import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const User = require('../models/User');

const SECRET = process.env.MONGODB_URI;
if (!SECRET) {
    throw new Error('MongoDB connection URI is not defined in the environment variables.');
  }

const createToken = (_id: Number) => {
    return jwt.sign({_id}, SECRET, { expiresIn: '3d' })
}

const signUpUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.signup(username, email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token })
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token })
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    signUpUser,
    loginUser
}