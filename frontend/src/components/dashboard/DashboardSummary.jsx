export default function DashboardSummary({
    stats,
    setActivePage
}) {

    return (

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">


            <div className="bg-white border border-slate-200 rounded-2xl p-6">

                <h2 className="text-lg font-bold text-slate-800">
                    Today's Focus
                </h2>

                <p className="text-sm text-slate-500 mt-2">
                    Keep your attention on the tasks that matter most today.
                </p>

                <button
                    onClick={() =>
                        setActivePage("tasks")
                    }
                    className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-semibold transition"
                >
                    View My Tasks
                </button>

            </div>



            <div className="bg-white border border-slate-200 rounded-2xl p-6">

                <h2 className="text-lg font-bold text-slate-800">
                    Progress Check
                </h2>

                <p className="text-sm text-slate-500 mt-2">

                    {stats?.completionPercentage >= 70
                        ? "Excellent progress! Keep going. 🎉"
                        : stats?.completionPercentage >= 40
                            ? "You're making good progress. Keep pushing! 💪"
                            : "Start with one important task and build momentum. 🌱"
                    }

                </p>

            </div>
            
        </div>

    );

}