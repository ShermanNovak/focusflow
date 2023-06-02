import express from 'express';
const Goal = require('../models/Goal');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('GET all goals');
});

router.post('/', async (req, res) => {
  const { title, description, deadline, isCompleted } = req.body

  try { 
    const goal = await Goal.create({ title, description, deadline, isCompleted })
    res.status(200).json(goal);
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

export default router;