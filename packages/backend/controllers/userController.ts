import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

const User = require('../models/User');

const SECRET = process.env.SECRET as string;
if (!SECRET) {
    throw new Error('SECRET is not defined in the environment variables.');
}

class UserController {
    public static createToken(_id: Number){
        return jwt.sign({ _id }, SECRET, { expiresIn: '3d' })
    }

    public async signUpUser(req: Request, res: Response) {
        const { username, email, password } = req.body;

        try {
            const user = await User.signup(username, email, password);
            const token = UserController.createToken(user._id);
            res.status(200).json({ email, token })
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }

    public async loginUser(req: Request, res: Response) {
        console.log('loginUser');
        const { email, password } = req.body;

        try {
            const user = await User.login(email, password);
            const token = UserController.createToken(user._id);
            res.status(200).json({ email, token })
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }
}

export const userController = new UserController();