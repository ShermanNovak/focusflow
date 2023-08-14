import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/requireAuth';

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

    public async updateThemeColour(req: AuthenticatedRequest, res: Response) {
        const user = await User.findByIdAndUpdate(req.user_id, req.body);
        
        if (!user) {
            return res.status(404).json({ error: 'No such user'})
        }
        
        res.status(200).json(user); 
    }

    public async getThemeColour(req: AuthenticatedRequest, res: Response) {
        const user = await User.findById(req.user_id);
        
        if (!user || !user.themeColour) {
            return res.status(404).json({ error: 'No such user'})
        }
        
        res.status(200).json(user.themeColour); 
    }
}

export const userController = new UserController();