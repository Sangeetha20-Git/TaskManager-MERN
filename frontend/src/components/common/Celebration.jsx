export default function Celebration({ celebration }) {

    if (!celebration) {
        return null;
    }

    return (

        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[200]">

            <div className="bg-white border border-green-200 shadow-xl rounded-2xl px-6 py-4 flex items-center gap-3 animate-bounce">

                <span className="text-2xl">
                    🎉
                </span>

                <div>

                    <p className="font-bold text-slate-800">
                        Great job!
                    </p>

                    <p className="text-sm text-slate-500">
                        Task completed!
                    </p>

                </div>

            </div>

        </div>

    );

}