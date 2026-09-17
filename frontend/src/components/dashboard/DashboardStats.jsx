export default function DashboardStats({ stats }) {

    return (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">


            {/* TOTAL */}

            <div className="bg-white rounded-xl border border-slate-200 px-4 py-4">

                <p className="text-xs font-medium text-slate-500">
                    Tasks
                </p>

                <div className="flex items-end justify-between mt-1">

                    <p className="text-2xl font-bold text-slate-900">
                        {stats.totalTasks}
                    </p>

                    <span className="text-indigo-500">
                        ▦
                    </span>

                </div>

            </div>



            {/* COMPLETED */}

            <div className="bg-white rounded-xl border border-slate-200 px-4 py-4">

                <p className="text-xs font-medium text-slate-500">
                    Done
                </p>

                <div className="flex items-end justify-between mt-1">

                    <p className="text-2xl font-bold text-slate-900">
                        {stats.completedTasks}
                    </p>

                    <span className="text-green-500">
                        ✓
                    </span>

                </div>

            </div>



            {/* PENDING */}

            <div className="bg-white rounded-xl border border-slate-200 px-4 py-4">

                <p className="text-xs font-medium text-slate-500">
                    Pending
                </p>

                <div className="flex items-end justify-between mt-1">

                    <p className="text-2xl font-bold text-slate-900">
                        {stats.pendingTasks}
                    </p>

                    <span className="text-amber-500">
                        ◷
                    </span>

                </div>

            </div>



            {/* PROGRESS */}

            <div className="bg-white rounded-xl border border-slate-200 px-4 py-4">

                <p className="text-xs font-medium text-slate-500">
                    Progress
                </p>

                <div className="flex items-end justify-between mt-1">

                    <p className="text-2xl font-bold text-slate-900">
                        {stats.completionPercentage}%
                    </p>

                    <span className="text-blue-500">
                        %
                    </span>

                </div>

                <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">

                    <div
                        className="h-full bg-indigo-600 rounded-full"
                        style={{
                            width: `${stats.completionPercentage}%`
                        }}
                    />

                </div>

            </div>


        </div>

    );

}