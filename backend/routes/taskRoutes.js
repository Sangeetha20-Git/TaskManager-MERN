const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { createTask, getTasks, createSubtask, getSubtasks, getTaskById, updateTask, deleteTask, getOverdueTasks } = require("../controllers/taskController");

router.post("/", protect, createTask);

router.get("/", protect, getTasks);

router.get("/overdue", protect, getOverdueTasks);

router.post("/:id/subtasks", protect, createSubtask);

router.get("/:id/subtasks", protect, getSubtasks);

router.get("/:id", protect, getTaskById);

router.put("/:id", protect, updateTask);

router.delete("/:id", protect, deleteTask);



module.exports = router;