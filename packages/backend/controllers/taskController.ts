import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/requireAuth";

const Task = require("../models/Task");
/* const Goal = require("../models/Goal"); */

class TaskController {
  public async getTasksOnly(req: AuthenticatedRequest, res: Response) {
    const tasks = await Task.find({
      user: req.user_id,
      type: "task",
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(tasks);
  }

  public async getEventsOnly(req: AuthenticatedRequest, res: Response) {
    const startDate = new Date().setHours(0, 0, 0, 0);
    const tasks = await Task.find({
      user: req.user_id,
      type: "event",
      startTime: { $gte: startDate },
    }).sort({
      createdAt: -1,
    });
    res.status(200).json(tasks);
  }

  public async getTask(req: AuthenticatedRequest, res: Response) {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "No such task" });

    res.status(200).json(task);
  }

  public async createTask(req: AuthenticatedRequest, res: Response) {
    try {
      const task = await Task.create({ ...req.body, user: req.user_id });

      /* if (req.body.goal_id) {
        const goal = await Goal.findByIdAndUpdate(req.body.goal_id, {
          user: req.user_id,
        }, {
          $push: {
            tasks: {
              _id: task._id,
            }
          }
        }, { new: true, useFindAndModify: false });

        if (!goal) {
          return res.status(404).json({ error: "No such goal" });
        }
        goal.tasks.push(task._id);
        await goal.save();
      } */

      res.status(200).json(task);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async deleteTask(req: AuthenticatedRequest, res: Response) {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ error: "No such task" });

    res.status(200).json(task);
  }

  public async updateTask(req: AuthenticatedRequest, res: Response) {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body);

    if (!task) return res.status(404).json({ error: "No such task" });

    res.status(200).json(task);
  }
}

export const taskController = new TaskController();
