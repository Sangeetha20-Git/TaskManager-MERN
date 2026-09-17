export default function TaskCard({
    task,
    getPriorityStyle,
    getStatusStyle,
    isOverdue,
    handleStatusChange,
    handleEditTask,
    handleDelete
}) {
    return (
        <div
            className={`
                relative
                border-b
                border-slate-200
                px-4
                py-3
                transition

                ${
                    isOverdue(task)
                        ? "bg-red-50/40"
                        : "hover:bg-blue-50/20"
                }
            `}
        >

            {/* NOTEBOOK LEFT MARGIN LINE */}
            <div
                className="absolute left-10 top-0 bottom-0 w-px"
                style={{
                    backgroundColor: "#fca5a5"
                }}
            />

            {/* TASK CONTENT */}
            <div className="relative z-10 pl-8">

                <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3">

                    {/* TASK DETAILS */}
                    <div className="flex-1 min-w-0">

                        <div className="flex flex-wrap items-center gap-2 mb-1">

                            {/* PRIORITY */}
                            <span
                                className={`
                                    text-xs
                                    font-semibold
                                    px-2
                                    py-1
                                    rounded-full
                                    border
                                    ${getPriorityStyle(task.priority)}
                                `}
                            >
                                {task.priority}
                            </span>

                            {/* STATUS */}
                            <span
                                className={`
                                    text-xs
                                    font-semibold
                                    px-2
                                    py-1
                                    rounded-full
                                    ${getStatusStyle(task.status)}
                                `}
                            >
                                {task.status}
                            </span>

                            {/* CATEGORY */}
                            {task.category && (
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-slate-100 text-slate-600">
                                    {task.category}
                                </span>
                            )}

                            {/* OVERDUE */}
                            {isOverdue(task) && (
                                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-red-100 text-red-600">
                                    Overdue
                                </span>
                            )}

                        </div>

                        {/* TITLE */}
                        <h3
                            className="text-base sm:text-lg font-bold text-blue-600 leading-6"
                            style={{
                                fontFamily: "'Comic Neue', cursive"
                            }}
                        >
                            {task.title}
                        </h3>

                        {/* DESCRIPTION */}
                        {task.description && (
                            <p
                                className="text-sm text-blue-500 leading-5"
                                style={{
                                    fontFamily: "'Comic Neue', cursive"
                                }}
                            >
                                {task.description}
                            </p>
                        )}

                        {/* DUE DATE */}
                        <div
                            className={`
                                flex
                                items-center
                                gap-2
                                mt-1
                                text-xs

                                ${
                                    isOverdue(task)
                                        ? "text-red-500 font-medium"
                                        : "text-blue-400"
                                }
                            `}
                            style={{
                                fontFamily: "'Comic Neue', cursive"
                            }}
                        >
                            <span>
                                ◷
                            </span>

                            <span>
                                {task.dueDate
                                    ? `Due ${task.dueDate.substring(0, 10)}`
                                    : "No due date"
                                }
                            </span>

                        </div>

                    </div>

                    {/* TASK ACTIONS */}
                    <div className="flex flex-wrap items-center gap-2">

                        {/* STATUS */}
                        <select
                            value={task.status}
                            onChange={(event) =>
                                handleStatusChange(
                                    task,
                                    event.target.value
                                )
                            }
                            className="border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="To-Do">
                                To-Do
                            </option>

                            <option value="In Progress">
                                In Progress
                            </option>

                            <option value="Done">
                                Done
                            </option>

                        </select>

                        {/* EDIT */}
                        <button
                            onClick={() =>
                                handleEditTask(task)
                            }
                            className="px-3 py-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 font-medium text-sm transition"
                        >
                            Edit
                        </button>

                        {/* DELETE */}
                        <button
                            onClick={() =>
                                handleDelete(task._id)
                            }
                            className="px-3 py-2 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 font-medium text-sm transition"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
}