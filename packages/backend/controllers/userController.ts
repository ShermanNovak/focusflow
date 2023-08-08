import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { useAuth0 } from '@auth0/auth0-react';

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
        const {user} = useAuth0();

        try {
            const usern = await User.signup(username, email, user.sub);
            const token = UserController.createToken(usern._id);
            res.status(200).json({ email, token })
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }

    public async loginUser(req: Request, res: Response) {
        const { email, password } = req.body;

        try {
            const user = await User.login(email, password);
            const token = UserController.createToken(user._id);
            res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.status(200).json({ email, token })
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }
}

export const userController = new UserController();