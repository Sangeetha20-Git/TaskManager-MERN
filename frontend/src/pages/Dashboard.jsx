import Sidebar from "../components/layout/Sidebar";
import DashboardHeader from "../components/layout/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import DashboardSummary from "../components/dashboard/DashboardSummary";
import ErrorMessage from "../components/common/ErrorMessage";
import Celebration from "../components/common/Celebration";
import TaskCard from "../components/tasks/TaskCard";
import TaskHeader from "../components/tasks/TaskHeader";
import Settings from "./Settings";

import { useEffect, useState } from "react";

import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from "../api/taskApi";

import {
    getDashboardStats
} from "../api/dashboardApi";

import {
    getMe
} from "../api/authApi";


export default function Dashboard({ setLoggedIn }) {

    // =========================================================
    // STATE
    // =========================================================

    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState(null);
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // dashboard / tasks / completed / settings
    const [activePage, setActivePage] = useState("dashboard");

    // Task form
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [category, setCategory] = useState("");
    const [dueDate, setDueDate] = useState("");

    // Edit task
    const [editingTask, setEditingTask] = useState(null);

    // Create/Edit modal
    const [showTaskModal, setShowTaskModal] = useState(false);

    // Search & filters
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");

    // Mobile sidebar
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Completion message
    const [celebration, setCelebration] = useState("");


    // =========================================================
    // DATE
    // =========================================================

    const today = new Date();

    const currentDate = today.toLocaleDateString(
        "en-US",
        {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );


    // =========================================================
    // LOAD USER
    // =========================================================

    const loadUser = async () => {
        try {

            const data = await getMe();

            if (data.success) {
                setUser(data.user);
            }

        } catch (error) {

            console.error("Get user error:", error);

        }
    };


    // =========================================================
    // LOAD TASKS
    // =========================================================

    const loadTasks = async () => {

        try {

            const taskData = await getTasks();

            setTasks(taskData.tasks || []);

        } catch (error) {

            console.error("Get tasks error:", error);

            setError(error.message);

        }

    };


    // =========================================================
    // LOAD DASHBOARD STATS
    // =========================================================

    const loadStats = async () => {

        try {

            const statsData = await getDashboardStats();

            setStats(statsData.stats);

        } catch (error) {

            console.error("Get stats error:", error);

            setError(error.message);

        }

    };


    // =========================================================
    // LOAD EVERYTHING
    // =========================================================

    const loadDashboard = async () => {

        try {

            setLoading(true);

            setError("");

            await Promise.all([
                loadUser(),
                loadTasks(),
                loadStats()
            ]);

        } catch (error) {

            console.error("Dashboard error:", error);

            setError(error.message);

        } finally {

            setLoading(false);

        }

    };


    // =========================================================
    // INITIAL LOAD
    // =========================================================

    useEffect(() => {

        loadDashboard();

    }, []);


    // =========================================================
    // CLEAR FORM
    // =========================================================

    const clearForm = () => {

        setTitle("");
        setDescription("");
        setPriority("Medium");
        setCategory("");
        setDueDate("");

    };


    // =========================================================
    // OPEN CREATE MODAL
    // =========================================================

    const handleOpenCreateModal = () => {

        clearForm();

        setEditingTask(null);

        setShowTaskModal(true);

    };


    // =========================================================
    // CLOSE MODAL
    // =========================================================

    const handleCloseModal = () => {

        clearForm();

        setEditingTask(null);

        setShowTaskModal(false);

    };


    // =========================================================
    // CREATE TASK
    // =========================================================

    const handleCreateTask = async (event) => {

        event.preventDefault();

        try {

            setError("");

            const taskData = {

                title: title.trim(),

                description: description.trim(),

                priority,

                category: category.trim(),

                dueDate

            };

            await createTask(taskData);

            await Promise.all([
                loadTasks(),
                loadStats()
            ]);

            handleCloseModal();

        } catch (error) {

            console.error("Create task error:", error);

            setError(error.message);

        }

    };


    // =========================================================
    // OPEN EDIT MODAL
    // =========================================================

    const handleEditTask = (task) => {

        setEditingTask(task);

        setTitle(task.title || "");

        setDescription(task.description || "");

        setPriority(task.priority || "Medium");

        setCategory(task.category || "");

        setDueDate(
            task.dueDate
                ? task.dueDate.substring(0, 10)
                : ""
        );

        setShowTaskModal(true);

    };


    // =========================================================
    // UPDATE TASK
    // =========================================================

    const handleUpdateTask = async (event) => {

        event.preventDefault();

        try {

            setError("");

            const taskData = {

                title: title.trim(),

                description: description.trim(),

                priority,

                category: category.trim(),

                dueDate

            };

            await updateTask(
                editingTask._id,
                taskData
            );

            await Promise.all([
                loadTasks(),
                loadStats()
            ]);

            handleCloseModal();

        } catch (error) {

            console.error("Update task error:", error);

            setError(error.message);

        }

    };


    // =========================================================
    // DELETE TASK
    // =========================================================

    const handleDelete = async (taskId) => {

        const confirmed = window.confirm(
            "Are you sure you want to permanently remove this completed task?"
        );

        if (!confirmed) return;

        try {

            await deleteTask(taskId);

            await loadTasks();

            await loadStats();

        } catch (error) {

            setError(error.message);

        }

    };


    // =========================================================
    // COMPLETION SOUND
    // =========================================================

    const playCompletionSound = () => {

        try {

            const audioContext =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

            const oscillator =
                audioContext.createOscillator();

            const gainNode =
                audioContext.createGain();

            oscillator.connect(gainNode);

            gainNode.connect(audioContext.destination);

            oscillator.type = "sine";

            oscillator.frequency.setValueAtTime(
                523.25,
                audioContext.currentTime
            );

            oscillator.frequency.setValueAtTime(
                659.25,
                audioContext.currentTime + 0.12
            );

            oscillator.frequency.setValueAtTime(
                783.99,
                audioContext.currentTime + 0.24
            );

            gainNode.gain.setValueAtTime(
                0.15,
                audioContext.currentTime
            );

            gainNode.gain.exponentialRampToValueAtTime(
                0.001,
                audioContext.currentTime + 0.45
            );

            oscillator.start();

            oscillator.stop(
                audioContext.currentTime + 0.45
            );

        } catch (error) {

            console.log(
                "Completion sound unavailable"
            );

        }

    };


    // =========================================================
    // SHOW CELEBRATION
    // =========================================================

    const showCelebration = () => {

        setCelebration(
            "🎉 Great job! Task completed!"
        );

        playCompletionSound();

        setTimeout(() => {

            setCelebration("");

        }, 2200);

    };


    // =========================================================
    // CHANGE TASK STATUS
    // =========================================================

    const handleStatusChange = async (
        task,
        newStatus
    ) => {

        try {

            setError("");

            // Send new status to backend
            const data = await updateTask(
                task._id,
                {
                    status: newStatus
                }
            );

            // Update React state immediately
            setTasks((currentTasks) =>
                currentTasks.map((currentTask) =>
                    currentTask._id === task._id
                        ? data.task
                        : currentTask
                )
            );

            // Show celebration when task becomes Done
            if (
                newStatus === "Done" &&
                task.status !== "Done"
            ) {

                showCelebration();

            }

            // Refresh statistics
            await loadStats();

        } catch (error) {

            console.error(
                "Status update error:",
                error
            );

            setError(error.message);

        }

    };


    // =========================================================
    // LOGOUT
    // =========================================================

    const handleLogout = () => {

        localStorage.removeItem("token");

        setLoggedIn(false);

    };


    // =========================================================
    // SEARCH + FILTER
    // =========================================================

    const filteredTasks = tasks.filter((task) => {

        const searchText =
            search.toLowerCase();

        const matchesSearch =
            task.title
                ?.toLowerCase()
                .includes(searchText) ||

            task.description
                ?.toLowerCase()
                .includes(searchText);

        const matchesStatus =
            statusFilter === "All" ||
            task.status === statusFilter;

        const matchesPriority =
            priorityFilter === "All" ||
            task.priority === priorityFilter;

        return (
            matchesSearch &&
            matchesStatus &&
            matchesPriority
        );

    });


    // =========================================================
    // ACTIVE TASKS
    // =========================================================

    const activeTasks =
        filteredTasks.filter(
            (task) => task.status !== "Done"
        );


    // =========================================================
    // COMPLETED TASKS
    // =========================================================

    const completedTasks =
        tasks.filter(
            (task) => task.status === "Done"
        );


    // =========================================================
    // PRIORITY STYLE
    // =========================================================

    const getPriorityStyle = (priority) => {

        switch (priority) {

            case "High":
                return "bg-red-50 text-red-600 border-red-200";

            case "Medium":
                return "bg-amber-50 text-amber-600 border-amber-200";

            case "Low":
                return "bg-green-50 text-green-600 border-green-200";

            default:
                return "bg-slate-50 text-slate-600 border-slate-200";

        }

    };


    // =========================================================
    // STATUS STYLE
    // =========================================================

    const getStatusStyle = (status) => {

        switch (status) {

            case "Done":
                return "bg-green-50 text-green-600";

            case "In Progress":
                return "bg-blue-50 text-blue-600";

            default:
                return "bg-slate-100 text-slate-600";

        }

    };


    // =========================================================
    // OVERDUE CHECK
    // =========================================================

    const isOverdue = (task) => {

        if (!task.dueDate) {
            return false;
        }

        if (task.status === "Done") {
            return false;
        }

        const taskDate =
            task.dueDate.substring(0, 10);

        const todayDate =
            new Date()
                .toISOString()
                .substring(0, 10);

        return taskDate < todayDate;

    };


    // =========================================================
    // USER INITIAL
    // =========================================================

    const getUserInitial = () => {

        if (!user?.name) {
            return "U";
        }

        return user.name
            .charAt(0)
            .toUpperCase();

    };


    // =========================================================
    // LOADING
    // =========================================================

    if (loading) {

        return (

            <div className="min-h-screen bg-slate-50 flex items-center justify-center">

                <div className="text-center">

                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>

                    <p className="text-slate-500 font-medium">
                        Loading your tasks...
                    </p>

                </div>

            </div>

        );

    }


    // =========================================================
    // MAIN UI
    // =========================================================

    return (

        <div className="min-h-screen bg-slate-50">


            {/* =================================================
                MOBILE OVERLAY
            ================================================= */}

            {sidebarOpen && (

                <div
                    onClick={() =>
                        setSidebarOpen(false)
                    }
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                />

            )}


            {/* =================================================
                SIDEBAR
            ================================================= */}

            <Sidebar
                activePage={activePage}
                setActivePage={setActivePage}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                handleLogout={handleLogout}
            />


            {/* =================================================
                MAIN
            ================================================= */}

            <main className="lg:ml-64">


                {/* =================================================
                    HEADER
                ================================================= */}

                <DashboardHeader
                    today={today}
                    currentDate={currentDate}
                    user={user}
                    setSidebarOpen={setSidebarOpen}
                    getUserInitial={getUserInitial}
                />


                {/* =================================================
                    CONTENT
                ================================================= */}

                <div className="p-4 sm:p-5 lg:p-6">


                    {/* =================================================
                        ERROR MESSAGE
                    ================================================= */}

                    <ErrorMessage
                        error={error}
                        setError={setError}
                    />


                    {/* =================================================
                        COMPLETION CELEBRATION
                    ================================================= */}

                    <Celebration
                        celebration={celebration}
                    />


                    {/* =================================================
                        DASHBOARD PAGE
                    ================================================= */}

                    {activePage === "dashboard" && (

                        <div>

                            <div className="mb-6">

                                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                                    Dashboard
                                </h1>

                                <p className="text-slate-500 mt-1">
                                    A quick look at your productivity.
                                </p>

                            </div>


                            {/* STATS */}

                            {stats && (
                                <DashboardStats
                                    stats={stats}
                                />
                            )}


                            {/* DASHBOARD SUMMARY */}

                            <DashboardSummary
                                stats={stats}
                                setActivePage={setActivePage}
                            />

                        </div>

                    )}


                    {/* =================================================
                        MY TASKS PAGE
                    ================================================= */}

                    {activePage === "tasks" && (

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

                            <TaskHeader
                                activeTasks={activeTasks}
                                search={search}
                                setSearch={setSearch}
                                statusFilter={statusFilter}
                                setStatusFilter={setStatusFilter}
                                priorityFilter={priorityFilter}
                                setPriorityFilter={setPriorityFilter}
                                handleOpenCreateModal={
                                    handleOpenCreateModal
                                }
                            />


                            {/* TASK LIST */}

                            <div className="p-3 sm:p-4">

                                {activeTasks.length === 0 ? (

                                    <div className="py-14 text-center">

                                        <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto text-xl mb-4">
                                            ✓
                                        </div>

                                        <h3 className="text-lg font-bold text-slate-700">
                                            No active tasks
                                        </h3>

                                        <p className="text-sm text-slate-400 mt-1">
                                            Add a task and start organizing your day.
                                        </p>

                                        <button
                                            onClick={
                                                handleOpenCreateModal
                                            }
                                            className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold"
                                        >
                                            + Create Task
                                        </button>

                                    </div>

                                ) : (

                                    <div
                                        className="relative min-h-[600px] overflow-hidden"
                                        style={{
                                            backgroundColor: "#fffef8",

                                            backgroundImage: `
                                                linear-gradient(
                                                    to bottom,
                                                    transparent 27px,
                                                    #bfdbfe 28px,
                                                    transparent 29px
                                                )
                                            `,

                                            backgroundSize: "100% 28px"
                                        }}
                                    >

                                        {/* NOTEBOOK LEFT MARGIN */}

                                        <div
                                            className="absolute left-10 top-0 bottom-0 w-px pointer-events-none z-20"
                                            style={{
                                                backgroundColor: "#fca5a5"
                                            }}
                                        />


                                        {/* TASKS */}

                                        <div className="relative z-10">

                                            {activeTasks.map((task) => (

                                                <TaskCard
                                                    key={task._id}
                                                    task={task}
                                                    getPriorityStyle={
                                                        getPriorityStyle
                                                    }
                                                    getStatusStyle={
                                                        getStatusStyle
                                                    }
                                                    isOverdue={
                                                        isOverdue
                                                    }
                                                    handleStatusChange={
                                                        handleStatusChange
                                                    }
                                                    handleEditTask={
                                                        handleEditTask
                                                    }
                                                    handleDelete={
                                                        handleDelete
                                                    }
                                                />

                                            ))}

                                        </div>

                                    </div>

                                )}

                            </div>

                        </div>

                    )}


                    {/* =================================================
                        COMPLETED PAGE
                    ================================================= */}

                    {activePage === "completed" && (

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">


                            <div className="p-5 sm:p-6 border-b border-slate-100">

                                <h1 className="text-2xl font-bold text-slate-800">
                                    Completed Tasks
                                </h1>

                                <p className="text-sm text-slate-500 mt-1">

                                    {completedTasks.length} completed task

                                    {completedTasks.length !== 1
                                        ? "s"
                                        : ""
                                    }

                                </p>

                            </div>


                            <div className="p-5 sm:p-6">

                                {completedTasks.length === 0 ? (

                                    <div className="py-14 text-center">

                                        <div className="w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center mx-auto text-xl mb-4">
                                            ✓
                                        </div>

                                        <h3 className="text-lg font-bold text-slate-700">
                                            No completed tasks yet
                                        </h3>

                                        <p className="text-sm text-slate-400 mt-1">
                                            Completed tasks will appear here.
                                        </p>

                                    </div>

                                ) : (

                                    <div className="space-y-3">

                                        {completedTasks.map((task) => (

                                            <div
                                                key={task._id}
                                                className="rounded-xl border border-green-100 bg-green-50/30 p-4"
                                            >

                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">


                                                    <div className="flex-1">


                                                        <div className="flex flex-wrap items-center gap-2 mb-2">

                                                            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-600">
                                                                ✓ Completed
                                                            </span>


                                                            {task.priority && (

                                                                <span
                                                                    className={`
                                                                        text-xs
                                                                        font-semibold
                                                                        px-2
                                                                        py-1
                                                                        rounded-full
                                                                        border
                                                                        ${getPriorityStyle(
                                                                            task.priority
                                                                        )}
                                                                    `}
                                                                >
                                                                    {task.priority}
                                                                </span>

                                                            )}


                                                            {task.category && (

                                                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                                                                    {task.category}
                                                                </span>

                                                            )}

                                                        </div>


                                                        <h3 className="text-base sm:text-lg font-bold text-slate-500 line-through">

                                                            {task.title}

                                                        </h3>


                                                        {task.description && (

                                                            <p className="text-sm text-slate-400 mt-1">
                                                                {task.description}
                                                            </p>

                                                        )}


                                                        {task.completedAt && (

                                                            <p className="text-xs text-slate-400 mt-2">

                                                                Completed{" "}

                                                                {new Date(
                                                                    task.completedAt
                                                                ).toLocaleDateString()}

                                                            </p>

                                                        )}

                                                    </div>


                                                    {/* MOVE BACK */}

                                                    <button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                task,
                                                                "To-Do"
                                                            )
                                                        }
                                                        className="px-3 py-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium text-sm"
                                                    >
                                                        Move to Tasks
                                                    </button>


                                                    {/* DELETE */}

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                task._id
                                                            )
                                                        }
                                                        className="px-3 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 font-medium text-sm transition"
                                                    >
                                                        🗑 Remove
                                                    </button>

                                                </div>

                                            </div>

                                        ))}

                                    </div>

                                )}

                            </div>

                        </div>

                    )}


                    {/* =================================================
                        SETTINGS PAGE
                    ================================================= */}

                    {activePage === "settings" && (

                        <Settings />

                    )}

                </div>

            </main>


            {/* =====================================================
                CREATE / EDIT MODAL
            ====================================================== */}

            {showTaskModal && (

                <div
                    className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                    onMouseDown={(event) => {

                        if (
                            event.target ===
                            event.currentTarget
                        ) {

                            handleCloseModal();

                        }

                    }}
                >

                    <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden">


                        {/* MODAL HEADER */}

                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">

                            <div>

                                <h2 className="text-xl font-bold text-slate-800">

                                    {editingTask
                                        ? "Edit Task"
                                        : "Create New Task"
                                    }

                                </h2>

                                <p className="text-sm text-slate-500 mt-1">

                                    {editingTask
                                        ? "Update the task details."
                                        : "Add something you want to accomplish."
                                    }

                                </p>

                            </div>


                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="w-9 h-9 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition"
                            >
                                ✕
                            </button>

                        </div>


                        {/* FORM */}

                        <form
                            onSubmit={
                                editingTask
                                    ? handleUpdateTask
                                    : handleCreateTask
                            }
                            className="p-6"
                        >

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                                {/* TITLE */}

                                <div className="md:col-span-2">

                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Task Title
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="What do you need to accomplish?"
                                        value={title}
                                        onChange={(event) =>
                                            setTitle(
                                                event.target.value
                                            )
                                        }
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />

                                </div>


                                {/* DESCRIPTION */}

                                <div className="md:col-span-2">

                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Description
                                    </label>

                                    <textarea
                                        placeholder="Add notes or details..."
                                        value={description}
                                        onChange={(event) =>
                                            setDescription(
                                                event.target.value
                                            )
                                        }
                                        rows="4"
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                                    />

                                </div>


                                {/* PRIORITY */}

                                <div>

                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Priority
                                    </label>

                                    <select
                                        value={priority}
                                        onChange={(event) =>
                                            setPriority(
                                                event.target.value
                                            )
                                        }
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                                    >

                                        <option value="Low">
                                            Low
                                        </option>

                                        <option value="Medium">
                                            Medium
                                        </option>

                                        <option value="High">
                                            High
                                        </option>

                                    </select>

                                </div>


                                {/* CATEGORY */}

                                <div>

                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Category
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Work, Personal, Learning..."
                                        value={category}
                                        onChange={(event) =>
                                            setCategory(
                                                event.target.value
                                            )
                                        }
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                    />

                                </div>


                                {/* DUE DATE */}

                                <div className="md:col-span-2">

                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Due Date
                                    </label>

                                    <input
                                        type="date"
                                        value={dueDate}
                                        onChange={(event) =>
                                            setDueDate(
                                                event.target.value
                                            )
                                        }
                                        className="w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
                                        required
                                    />

                                </div>

                            </div>


                            {/* FORM BUTTONS */}

                            <div className="mt-7 flex justify-end gap-3">

                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold transition"
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-xl transition"
                                >

                                    {editingTask
                                        ? "Update Task"
                                        : "Create Task"
                                    }

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </div>

    );

}