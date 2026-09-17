export default function DashboardHeader({
    today,
    currentDate,
    user,
    setSidebarOpen,
    getUserInitial
}) {

    return (

        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-8">

            <div className="flex items-center gap-4">


                {/* MOBILE MENU */}

                <button
                    onClick={() =>
                        setSidebarOpen(true)
                    }
                    className="lg:hidden text-2xl text-slate-600"
                >
                    ☰
                </button>


                <div>

                    <p className="text-sm text-slate-500">
                        {currentDate}
                    </p>

                    <h2 className="text-lg font-bold text-slate-800">
                        Good {today.getHours() < 12
                            ? "morning"
                            : today.getHours() < 18
                                ? "afternoon"
                                : "evening"
                        }, {user?.name || "there"} 👋
                    </h2>

                </div>

            </div>



            {/* USER */}

            <div className="flex items-center gap-3">

                <div className="hidden sm:block">

                    <p className="text-sm font-semibold text-slate-700">
                        {user?.name || "User"}
                    </p>

                </div>

                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">

                    {getUserInitial()}

                </div>

            </div>

        </header>

    );

}