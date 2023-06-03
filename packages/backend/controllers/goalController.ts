import mongoose from 'mongoose';
import { Request, Response } from 'express';

const Goal = require('../models/Goal');

// get all goals
const getGoals = async (req: Request, res: Response) => {
    const goals = await Goal.find({}).sort({ createdAt: -1 });
    res.status(200).json(goals);
}

// get a single goal
const getGoal = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such goal'})
    }

    const goal = await Goal.findById(id);
    if (!goal) {
        return res.status(404).json({ error: 'No such goal'})
    }

    res.status(200).json(goal);
}

// create new goal
const createGoal = async (req: Request, res: Response) => {
    try { 
        const goal = await Goal.create({...req.body})
        res.status(200).json(goal);
    } catch (error: any) {
        res.status(400).json({ error: error.message })
    }
}

// delete goal
const deleteGoal = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such goal'})
    }

    const goal = await Goal.findOneAndDelete({ _id: id });
    if (!goal) {
        return res.status(404).json({ error: 'No such goal'})
    }

    res.status(200).json(goal); 
}

// update goal
const updateGoal = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such goal'})
    }

    const goal = await Goal.findOneAndUpdate({ _id: id }, {
        ...req.body
    });
    
    if (!goal) {
        return res.status(404).json({ error: 'No such goal'})
    }
    
    res.status(200).json(goal); 
}

module.exports = {
    getGoals,
    getGoal,
    createGoal,
    deleteGoal,
    updateGoal
}