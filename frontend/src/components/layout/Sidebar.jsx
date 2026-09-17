export default function Sidebar({
    activePage,
    setActivePage,
    sidebarOpen,
    setSidebarOpen,
    handleLogout
}) {

    return (

        <aside
            className={`
                fixed
                left-0
                top-0
                z-50
                h-screen
                w-64
                bg-[#111827]
                text-white
                transition-transform
                duration-300

                ${sidebarOpen
                    ? "translate-x-0"
                    : "-translate-x-full"
                }

                lg:translate-x-0
            `}
        >

            {/* =====================================================
                LOGO
            ====================================================== */}

            <div className="h-20 flex items-center px-6 border-b border-slate-800">

                <div>

                    <h1 className="font-bold text-lg text-white">
                        Taskly
                    </h1>

                    <p className="text-xs text-slate-400">
                        Plan - Focus - Achieve
                    </p>

                </div>

            </div>


            {/* =====================================================
                NAVIGATION
            ====================================================== */}

            <nav className="p-4 space-y-2">


                {/* DASHBOARD */}

                <button
                    onClick={() => {

                        setActivePage("dashboard");

                        setSidebarOpen(false);

                    }}

                    className={`
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-xl
                        transition

                        ${
                            activePage === "dashboard"
                                ? "bg-blue-600 text-white"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }
                    `}
                >

                    <span>
                        ▦
                    </span>

                    <span className="font-medium">
                        Dashboard
                    </span>

                </button>


                {/* MY TASKS */}

                <button
                    onClick={() => {

                        setActivePage("tasks");

                        setSidebarOpen(false);

                    }}

                    className={`
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-xl
                        transition

                        ${
                            activePage === "tasks"
                                ? "bg-blue-600 text-white"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }
                    `}
                >

                    <span>
                        ✓
                    </span>

                    <span>
                        My Tasks
                    </span>

                </button>


                {/* COMPLETED */}

                <button
                    onClick={() => {

                        setActivePage("completed");

                        setSidebarOpen(false);

                    }}

                    className={`
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-xl
                        transition

                        ${
                            activePage === "completed"
                                ? "bg-blue-600 text-white"
                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }
                    `}
                >

                    <span>
                        ☑
                    </span>

                    <span>
                        Completed
                    </span>

                </button>

                            {/* =====================================================
                Settings
            ====================================================== */}

                <button
    onClick={() => setActivePage("settings")}
    className={`
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-lg
        font-medium
        transition

        ${
            activePage === "settings"
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
        }
    `}
>
    <span>⚙</span>
    <span>Settings</span>
</button>

            </nav>

            




            {/* =====================================================
                LOGOUT
            ====================================================== */}

            <div className="absolute bottom-0 left-0 right-0 p-4">

                <button
                    onClick={handleLogout}

                    className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-4
                        py-3
                        rounded-xl
                        text-slate-400
                        hover:bg-red-500/10
                        hover:text-red-400
                        transition
                    "
                >

                    <span>
                        ↪
                    </span>

                    <span>
                        Logout
                    </span>

                </button>

            </div>

        </aside>
    );
}