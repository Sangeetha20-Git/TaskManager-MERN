const Task = require("../models/Task");

//CREATE a tasks
const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            dueDate,
            priority,
            category
        } = req.body;

        const task = await Task.create({
            title,
            description,
            dueDate,
            priority,
            category,
            user: req.user.userId
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            task
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//SUBTASK
const createSubtask = async (req, res) => {
    try {
        const {
            title,
            description,
            dueDate,
            priority,
            category
        } = req.body;

        const parentTask = await Task.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!parentTask) {
            return res.status(404).json({
                success: false,
                message: "Parent task not found"
            });
        }

        const subtask = await Task.create({
            title,
            description,
            dueDate,
            priority,
            category,
            parentTask: req.params.id,
            user: req.user.userId
        });

        res.status(201).json({
            success: true,
            message: "Subtask created successfully",
            subtask
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//GET a subtasks
const getSubtasks = async (req, res) => {
    try {
        const subtasks = await Task.find({
            parentTask: req.params.id,
            user: req.user.userId
        });

        res.status(200).json({
            success: true,
            subtasks
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


//GET a tasks

const getTasks = async (req, res) => {
    try {
        const query = {
            user: req.user.userId
        };

        if (req.query.priority) {
            query.priority = req.query.priority;
        }

        if (req.query.category) {
            query.category = req.query.category;
        }

        if (req.query.status) {
            query.status = req.query.status;
        }

        if (req.query.search) {
            query.$or = [
                {
                    title: {
                        $regex: req.query.search,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: req.query.search,
                        $options: "i"
                    }
                }
            ];
        }

        if (req.query.dueFrom && req.query.dueTo) {
        query.dueDate = {
        $gte: new Date(req.query.dueFrom),
        $lte: new Date(req.query.dueTo)
    };
}

        const tasks = await Task.find(query);

        res.status(200).json({
            success: true,
            tasks
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//GET a single task by ID
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            task
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//UPDATE a Task
const updateTask = async (req, res) => {
    try {
        const updateData = { ...req.body };

        if (updateData.status === "Done") {
            updateData.completedAt = new Date();
        }

        if (
            req.body.status === "To-Do" ||
            req.body.status === "In Progress"
        ) {
            updateData.completedAt = null;
        }

        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user.userId
            },
            updateData,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            task
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//DELETE a Task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//DUE DATE tasks
const getOverdueTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.userId,
            dueDate: {
                $lt: new Date()
            },
            status: {
                $ne: "Done"
            }
        });

        res.status(200).json({
            success: true,
            tasks
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



module.exports = {
    createTask,
    getTasks,
    createSubtask,
    getSubtasks,
    getTaskById,
    updateTask,
    deleteTask,
    getOverdueTasks

};