export default function TaskHeader({
    activeTasks,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    handleOpenCreateModal
}) {

    return (

        <div className="px-4 py-3 sm:px-5 sm:py-4 border-b border-slate-100">

            {/* ================================================
                TOP ROW
            ================================================= */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">

                {/* TITLE */}

                <div>

                    <h1 className="text-2xl font-bold text-slate-800">
                        My Tasks
                    </h1>

                    <p className="text-sm text-slate-500 mt-0.5">

                        {activeTasks.length} active task
                        {activeTasks.length !== 1
                            ? "s"
                            : ""
                        }

                    </p>

                </div>


                {/* SEARCH + CREATE */}

                <div className="flex flex-col sm:flex-row gap-2">

                    {/* SEARCH */}

                    <div className="relative w-full sm:w-64">

                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            ⌕
                        </span>

                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            className="
                                w-full
                                border
                                border-slate-200
                                rounded-xl
                                pl-9
                                pr-3
                                py-2
                                text-sm
                                outline-none
                                focus:ring-2
                                focus:bg-blue-600
                            "
                        />

                    </div>


                    {/* CREATE BUTTON */}

                    <button
                        onClick={handleOpenCreateModal}
                        className="
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            font-semibold
                            px-5
                            py-2
                            rounded-xl
                            transition
                            whitespace-nowrap
                        "
                    >
                        + Create Task
                    </button>

                </div>

            </div>


            {/* ================================================
                FILTERS
            ================================================= */}

            <div className="flex flex-wrap items-center gap-2 mt-3">

                {/* STATUS */}

                <select
                    value={statusFilter}
                    onChange={(event) =>
                        setStatusFilter(
                            event.target.value
                        )
                    }
                    className="
                        border
                        border-slate-200
                        rounded-lg
                        px-3
                        py-1.5
                        text-sm
                        bg-white
                        outline-none
                        focus:ring-2
                        focus:ring-bg-blue-600
                    "
                >

                    <option value="All">
                        All Status
                    </option>

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


                {/* PRIORITY */}

                <select
                    value={priorityFilter}
                    onChange={(event) =>
                        setPriorityFilter(
                            event.target.value
                        )
                    }
                    className="
                        border
                        border-slate-200
                        rounded-lg
                        px-3
                        py-1.5
                        text-sm
                        bg-white
                        outline-none
                        focus:ring-2
                        focus:ring-indigo-500
                    "
                >

                    <option value="All">
                        All Priority
                    </option>

                    <option value="High">
                        High
                    </option>

                    <option value="Medium">
                        Medium
                    </option>

                    <option value="Low">
                        Low
                    </option>

                </select>


                {/* CLEAR FILTERS */}

                {(search ||
                    statusFilter !== "All" ||
                    priorityFilter !== "All") && (

                    <button
                        onClick={() => {

                            setSearch("");

                            setStatusFilter("All");

                            setPriorityFilter("All");

                        }}
                        className="
                            text-sm
                            bg-blue-600
                            font-medium
                            px-2
                            hover:bg-blue-700
                        "
                    >
                        Clear filters
                    </button>

                )}

            </div>

        </div>

    );

}