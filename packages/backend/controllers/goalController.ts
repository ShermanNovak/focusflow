import mongoose from 'mongoose';
import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/requireAuth';

const Goal = require('../models/Goal');

class GoalController {
    public async getGoals(req: AuthenticatedRequest, res: Response) {
        const goals = await Goal.find({ user: req.user_id }).sort({ createdAt: -1 });
        res.status(200).json(goals);
    }

    public async getGoalsWithTasks(req: AuthenticatedRequest, res: Response) {
        const goals = await Goal.find({ user: req.user_id }).populate('tasks');
        res.status(200).json(goals);
    }

    public async getGoal(req: AuthenticatedRequest, res: Response) {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such goal'})
        }

        const goal = await Goal.findById(id, { user: req.user_id });
        if (!goal) {
            return res.status(404).json({ error: 'No such goal'})
        }

        res.status(200).json(goal);
    }

    public async createGoal(req: AuthenticatedRequest, res: Response) {
        try { 
            const goal = await Goal.create({...req.body, user: req.user_id})
            res.status(200).json(goal);
        } catch (error: any) {
            res.status(400).json({ error: error.message })
        }
    }

    public async deleteGoal(req: AuthenticatedRequest, res: Response) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such goal'})
        }

        const goal = await Goal.findOneAndDelete({ _id: id, user: req.user_id });
        if (!goal) {
            return res.status(404).json({ error: 'No such goal'})
        }

        res.status(200).json(goal); 
    }

    public async updateGoal(req: AuthenticatedRequest, res: Response) {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'No such goal'})
        }

        const goal = await Goal.findOneAndUpdate({ _id: id, user: req.user_id }, {
            ...req.body
        });
        
        if (!goal) {
            return res.status(404).json({ error: 'No such goal'})
        }
        
        res.status(200).json(goal); 
    }
}

export const goalController = new GoalController();