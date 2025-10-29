import * as taskService  from '../services/taskService.js';

export async function getTasks(req, res, next) {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
}

export async function createTask(req, res, next) {
  const { title, completed } = req.body;
  const task = await taskService.createTask({ title, completed });
  res.status(201).json(task);
}

export async function getTaskById(req, res, next) {
  const numericId = Number(req.params.id);

  if (!Number.isInteger(numericId)) {
    return res.status(400).json({
      error: "Validation failed",
      details: ["ID must be a number"]
    });
  }

  try {
    const task = await taskService.getTaskById(numericId);
    res.status(200).json(task);
  } catch (err) {
    if (err.status === 404) return res.status(404).json({ error: err.message });
    next(err);
}
}