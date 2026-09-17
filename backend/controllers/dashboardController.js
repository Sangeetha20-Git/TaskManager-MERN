const Task = require("../models/Task");


// ===============================
// GET DASHBOARD STATS
// ===============================

const getDashboardStats = async (req, res) => {

    try {

        const userId = req.user.userId;


        // TOTAL TASKS
        const totalTasks = await Task.countDocuments({
            user: userId,
            parentTask: null
        });


        // COMPLETED TASKS
        const completedTasks = await Task.countDocuments({
            user: userId,
            parentTask: null,
            status: "Done"
        });


        // PENDING TASKS
        const pendingTasks = await Task.countDocuments({
            user: userId,
            parentTask: null,
            status: "To-Do"
        });


        // IN PROGRESS TASKS
        const inProgressTasks = await Task.countDocuments({
            user: userId,
            parentTask: null,
            status: "In Progress"
        });


        // COMPLETION PERCENTAGE
        const completionPercentage =
            totalTasks === 0
                ? 0
                : Math.round(
                    (completedTasks / totalTasks) * 100
                );


        res.status(200).json({

            success: true,

            stats: {
                totalTasks,
                completedTasks,
                pendingTasks,
                inProgressTasks,
                completionPercentage
            }

        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


module.exports = {
    getDashboardStats
};