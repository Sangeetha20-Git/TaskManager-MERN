const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        dueDate: {
            type: Date,
            required: true
        },

        priority: {
            type: String,
            enum: ["Low", "Medium", "High"],
            default: "Medium"
        },

        category: {
            type: String,
            default: "General",
            trim: true
        },

        status: {
            type: String,
            enum: ["To-Do", "In Progress", "Done"],
            default: "To-Do"
        },

        completedAt: {
            type: Date,
            default: null
        },

        parentTask: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task",
            default: null
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Task", taskSchema);