// build your `/api/tasks` router here
const express = require("express");
const Task = require("./model");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.getTasks();
    const booleanTasks = tasks.map((task) => {
      if (task.task_completed === 0 || !task.task_completed) {
        return { ...task, task_completed: false };
      } else {
        return { ...task, task_completed: true };
      }
    });
    res.status(200).json(booleanTasks);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newTask = await Task.createTask(req.body);
    if (newTask[0].task_completed === 0 || !newTask[0].task_completed) {
      res.status(201).json({
        ...newTask[0],
        task_completed: false,
      });
    } else {
      res.status(201).json({
        ...newTask[0],
        task_completed: true,
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
